
function checkAnswer(matrix,size,matAnswer) {
    //Create an array of coodinates of wrong numbers
     let invalid= []
     for(let i=0;i<size*size;i++) {
         if(matrix[Math.floor(i/size)][i%size]!=matAnswer[Math.floor(i/size)][i%size]) {
             invalid.push(i)
         }
     }
    return invalid
 }


function printScreen(mat, size) {

    win.innerHTML='Good Luck'
    board.innerHTML = ''
   
    for(let i=0;i<size;i++) {
        let tr = document.createElement('tr')
        tr.setAttribute('class', `tr${size}`)
        for(let j=0;j<size;j++) {
            let td = document.createElement('td')
            td.setAttribute('class', `td${size}`)
            let numEl = document.createElement('input');
            numEl.setAttribute('type', 'text')
            numEl.setAttribute('maxlength', '1')
            numEl.setAttribute('class', 'dig')
            numEl.setAttribute('onfocus', `this.value=''`)
            numEl.addEventListener('keyup', function(e){
              if(!e.target.value.match(`[1-${size}]`)) e.target.value=''
            });  

            if(mat[i][j]!=0) {
                numEl.setAttribute('value',  mat[i][j])
                numEl.setAttribute('disabled','')
            }
            else {
                numEl.setAttribute('value',  '')
                }
                td.appendChild(numEl)
                tr.appendChild(td)
        }
        board.appendChild(tr)
    }  
   
}

async function runGame() {

    try {
        const response = await fetch (`/sudoku?game=${size}:${hintPercent}`, {
        headers: {"Content-Type": "application/json; charset=utf-8"},
        method: 'GET'})
        game = await response.json()
    }
    
    catch {
      document.write('Error! No data')
    }
    
    console.log(game)

    printScreen(game.hiddenMatrix, game.size)

}

function checkGame() {
    let matAnswer = []
    let cellArr= document.getElementsByClassName("dig")
    //Fill matrix with zeroes
    for (let i=0;i<game.size;i++) {
        let row=[]
        for (let j=0;j<game.size;j++) {
            
                 cellArr[game.size*i+j].style['background-color'] = ''
                row.push(parseInt(cellArr[game.size*i+j].value))
        }

        matAnswer.push(row)
    }
    let invalid = checkAnswer(game.matrix, size, matAnswer)
   
    invalid.forEach(element => {
        cellArr[element].style['background-color'] = 'red'
        
    });

  
    if(invalid.length===0){
        board.style["animation-name"] = "example"
        board.style["animation-duration"] = "1s"
        win.innerHTML='Correct!'
        setTimeout(function(){
            board.style["animation-name"] = ""
            board.style["animation-duration"] = ""
            runGame()
        }, 1000);
    } 
}
    function setBoard4x4() {
        size=4
        runGame()
    }

    function setBoard6x6() {
        size=6
        runGame()
    }

    function setBoard9x9() {
        size=9
        runGame()
    }
    
    function setGameEasy() {
       
        hintPercent=0.75
        runGame()

    }

    function setGameNormal() {
        hintPercent=0.5
        runGame()
    }

    function setGameHard() {
        hintPercent=0.35
        runGame()
    }

let game 
let size=9, hintPercent=0.5
let board= document.getElementById("numbers")
let win= document.getElementById("win")

runGame()