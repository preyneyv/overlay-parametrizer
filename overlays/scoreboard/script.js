prm.onnewstate = state => {
    state['team-a'] = state['team-a'] || {}
    state['team-b'] = state['team-b'] || {}

    $('#team-a-score').text(state['team-a'].score || '0')
    $('#team-b-score').text(state['team-b'].score || '0')
    $('#team-a-name div').text(state['team-a'].name || '')
        .css({ transform: `scaleX(${getNameRatio(state['team-a'].name)})` })
    $('#team-b-name div').text(state['team-b'].name || '')
        .css({ transform: `scaleX(${getNameRatio(state['team-b'].name)})` })
}

function getNameRatio(name) {
    return Math.min(1, 510 / getTextWidth((name || '').toUpperCase(), "bold 54px 'Futura PT'"))
}