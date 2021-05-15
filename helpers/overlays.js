const path = require('path')
const fs = require('fs').promises

let overlaysRoot;

exports.setOverlaysRoot = root => overlaysRoot = root

exports.loadOverlays = async () => {
    const folders = await fs.readdir(overlaysRoot)
    const overlays = {}
    await Promise.all(folders.map(async id => {
        const root = path.join(overlaysRoot, id)
        const config = JSON.parse(await fs.readFile(path.join(root, 'config.json')))
        overlays[id] = {
            id, root,
            name: config.name,
            params: config.params,
            state: config.state || {}
        }
    }))

    return overlays
}

exports.saveOverlay = async (overlay) => {
    const { id, params, state, name } = overlay
    const config = path.join(overlaysRoot, id, 'config.json')
    await fs.writeFile(config, JSON.stringify({ params, state, name }))
}
