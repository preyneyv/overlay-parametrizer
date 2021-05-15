prm.onnewstate = state => {
    state['player-a'] = state['player-a'] || {}
    state['player-b'] = state['player-b'] || {}

    $('#player-a-score').text(state['player-a'].score || '0')
    $('#player-b-score').text(state['player-b'].score || '0')
    $('#player-a-name').text(state['player-a'].name || '')
    $('#player-b-name').text(state['player-b'].name || '')
}