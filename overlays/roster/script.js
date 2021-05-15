function populateTeam(root, team) {
    let count = 0;
    const scale = Math.min(1, 795 / getTextWidth((team.name || '').toUpperCase(), "bold 80px 'Futura PT'"))

    root.find('.team-name div').text(team.name || '').css({ transform: `scaleX(${scale})` })
    for (let [key, name] of Object.entries(team.players)) {
        root.find(`.${key}`).text(name || '')
        name && count++
    }

    return count
}

prm.onnewstate = state => {
    state['team-a'] = state['team-a'] || {}
    state['team-a']['players'] = state['team-a']['players'] || {}

    state['team-b'] = state['team-b'] || {}
    state['team-b']['players'] = state['team-b']['players'] || {}

    $("#game-title").text(state['game-title'] || '')
    const size = Math.max(
        populateTeam($('.team-a'), state['team-a']),
        populateTeam($('.team-b'), state['team-b'])
    )

    $('body')
        .toggleClass('roster-6', size == 6)
        .toggleClass('roster-3', size <= 3)
}
