const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const OVERLAYS_ROOT = process.env.OVERLAYS_ROOT || path.join(__dirname, 'overlays')
const PORT = process.env.PORT || 8000

// Global store stuff. Import overlay store, expose io to the rest of the app.
const { loadOverlays, setOverlaysRoot } = require('./helpers/overlays')
const store = require('./store')
store.io = io
const { overlays } = store
setOverlaysRoot(OVERLAYS_ROOT)

// General middleware.
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

;(async () => {
    // Load the overlays
    Object.assign(overlays, await loadOverlays())
    console.log('Overlays loaded!')
    require('./routes')(app)

    // Start the server.
    http.listen(PORT, () => {
        const host = `http://localhost:${PORT}`
        console.log(`Listening on ${host}!`)
        console.log(`Dashboard: ${host}/dashboard`)
        console.log(`O V E R L A Y S`)
        Object.keys(overlays).forEach(name => console.log(` ${name} => ${host}/overlays/${name}`))
    })
})();


// Socket.IO stuff
io.on('connection', (socket) => {
    let overlayId
    // Sockets send an identifying message to tell us which overlay they want
    // to listen to events for.
    socket.once('identify', _overlayId => {
        overlayId = _overlayId
        socket.join(overlayId)
        console.log(`Acquired new ${overlayId}`)
        // Send the initial state.
        socket.emit('state', overlays[overlayId].state)
    })

    // Just make a note of the disconnect for now.
    socket.on('disconnect', () => {
        console.log(`Lost connection to a ${overlayId}`)
    })
})
