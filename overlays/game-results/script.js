prm.onnewstate = state => {
    state.prizes = state.prizes || {}

    $("#game-title").text(state['game-title'] || '')
    $("#first-prize div").text(state.prizes.first || '')
    $("#second-prize div").text(state.prizes.second || '')
    $("#third-prize div").text(state.prizes.third || '')

    $("body").toggleClass('results-2', (state.prizes.third || '').trim() == '')

    const teams = [state['team-a'], state['team-b']]
    if (state.winner) {
        const id = state.winner == 'team-b'
        $("#first-place").text(teams[id + 0] || '')
        $("#second-place").text(teams[!id + 0] || '')
    } else {
        $("#first-place").text('No Winner')
        $("#second-place").text('Declared')
    }
    $("#third-place").text(state['third-place'] || '')
}
