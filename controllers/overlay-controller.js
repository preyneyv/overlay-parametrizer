const { saveOverlay } = require('../helpers/overlays')
const { overlays, io } = require('../store')

exports.readAll = (_, res) => {
    return res.send(overlays)
}

exports.update = (req, res) => {
    const { overlay: id } = req.params
    const state = req.body

    overlays[id].state = state
    saveOverlay(overlays[id])
    io.to(id).emit('state', state)

    res.send({ success: true })
}
