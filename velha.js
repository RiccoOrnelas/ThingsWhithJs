const bRegions = document.querySelectorAll('#gameBoard span') //Seleciona todos span da div com ID gameboard
let vBoard = []
let turnPlayer = ''

function updateTitle() {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']] // Posteriormente cada array se tornara uma linha de uma tabela, onde mostrará os campos e o que esta acontecendo através do console
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de:<span id="turnPlayer"></span>'
    updateTitle()
    bRegions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handBoardClick) //Dentro do adEventListener irá ser executada outra função assim que um campo receber o click;  
    })
}
function disableRegion(element) {
    element.style.cursor = 'defaut'
    element.removeEventListener('click', handBoardClick)
} //Função com o Parametro element, como o 'ev', avisa o JS que se trata de um elemento, pelo método 'style', podemos adicionar caracteristicas CSS.
function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector('[data-region= "' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + 'venceu!'
}

function handBoardClick(ev) {
    let span = ev.currentTarget
    let region = span.dataset.region
    let rowColumnPair = region.split('.')
    let row = rowColumnPair[0]
    let column = rowColumnPair[1]
    if (turnPlayer === 'player1') {
        span.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    console.clear()
    console.table(vBoard)
    disableRegion(span)
    const winRegions = getWinRegions()
    if (winRegions.length > 0) {
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

document.getElementById('start').addEventListener('click', initializeGame)  //Reação do Botão de Inicialização, atribuindo uma função



