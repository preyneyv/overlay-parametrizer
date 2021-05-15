const express = require('express')
const path = require('path')
const { overlays } = require('./store')

const overlayController = require('./controllers/overlay-controller')

module.exports = (app) => {
    app.use('/dashboard', express.static(path.join(__dirname, 'dashboard', 'build')))
    app.get('/client-framework.js', (_, res) =>
        res.sendFile(path.join(__dirname, 'helpers', 'client-framework.js')))

    Object.values(overlays).map(({ id, root }) => app.use(`/overlays/${id}`, express.static(root)))

    app.get('/api/overlays', overlayController.readAll)
    app.put('/api/overlays/:overlay', overlayController.update)
}
