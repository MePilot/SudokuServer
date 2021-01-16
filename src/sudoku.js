class Sudoku {
    constructor(size) {
        this.SIZE=size
        this.BOX_SIZE=Math.floor(Math.sqrt(this.SIZE)) 
         //Empty matrix
         this.matrix=[]
         this.hiddenMatrix=[]
        
        //Fill matrix with zeroes
         for (let i=0;i<size;i++) {
            let row=[], rowHidden=[]
            for (let j=0;j<size;j++) {
                row.push(0)
                rowHidden.push(0)
            }
            this.matrix.push(row)
            this.hiddenMatrix.push(rowHidden)
        }
    }
    
    get size() {
        //Return the size of matrix 
        return this.SIZE
    }

    get hiddenMat() {
         //Return the matrix with removed numbers
        return this.hiddenMatrix
    }
    get mat() {
        //Return the matrix with removed numbers
       return this.matrix
   }
    //Check if the number is present in given row
     checkRow(mat, row, num) {
        if(mat[row].includes(num)) {
            return false  //The given number is already present in current row, so it is invalid
        }
        return true //The given number is valid
    }
    //Check if the number is present in given column
     checkCol(mat,col, num) {
        for(let i=0;i<this.SIZE;i++) {
            if(mat[i][col]===num) {
               return false //The given number is already present in current column, so so it is invalid
            }
        }
        return true //The given number is valid
    }
    //Check if the number is present in a box that contains it (given the number coordinates)
     checkBox(mat,row, col, num) {
        
        let startRow, startCol

        //Calculate the start index of the box
        startRow = row - row % this.BOX_SIZE
        startCol= col - col % this.BOX_SIZE
        
        //Check the box
        for(let i=startRow;i<startRow+this.BOX_SIZE;i++) {
            for(let j=startCol;j<startCol+this.BOX_SIZE;j++) {
                if(mat[i][j]===num) {
                    return false  //The given number is already inside the box, so it is invalid
                }
            }
        }
    
        return true //The given number is valid
    }
   
    generateBoard() {
        //Try to generate a valid Sudoku board
        let isComplete=true
        let row, col
        //Check the board. If it's completely filled - return true. If not, remember the last empty space
        for(let i=0;i<this.SIZE*this.SIZE;i++) {
            if(this.matrix[Math.floor(i/this.SIZE)][i%this.SIZE]===0) {
                row=Math.floor(i/this.SIZE)
                col=i%this.SIZE
                isComplete=false
                break
            }
        }

        if(isComplete) {
            return true 
        }
        
        //Fill the array with numbers in random order
        
        let rndNums = []
        while (rndNums.length<this.SIZE) {
            let rndNum = Math.floor(Math.random() * this.SIZE)+1
            
            if(!rndNums.includes(rndNum)) {
                 rndNums.push(rndNum)
             } 
         }
         
          //Leave only valid numbers in the array for given cell
         rndNums=rndNums.filter((num)=>this.checkRow(this.matrix,row, num) && this.checkCol(this.matrix, col, num) && this.checkBox(this.matrix, row,col,num))
         
        //Try out all the valid numbers from array
         while(rndNums.length!=0) {
             //Put the legal number into the board
             this.matrix[row][col] = rndNums.pop()
            //Recursively call itself with modified board. Finish with true, when it's completely filled
            if(this.generateBoard()) {
                return true
            }
        }
        //When no numbers left in array, it means no number is legal to be placed in a cell
        this.matrix[row][col] = 0  //Assumption was wrong, so reset
        return false // backtrack
        
        }

    countSolutions(count) {
        //Count the amount of solutions to Sudoku game
         let isComplete=true
         let row, col
         //Check the board. If it's completely filled - return true. If not, remember the last empty space
         for(let i=0;i<this.SIZE*this.SIZE;i++) {
             if(this.hiddenMatrix[Math.floor(i/this.SIZE)][i%this.SIZE]===0) {
                 row=Math.floor(i/this.SIZE)
                 col=i%this.SIZE
                 isComplete=false
                 break
             }
         }
 
         if(isComplete) {
             //Sum solutions
             return 1+count
         }
         
         //Fill the array with numbers in random order
         
         let rndNums = []
        
          for (let i=1;i<=this.SIZE;i++) {
            rndNums.push(i)
          }
          //Leave only valid numbers in the array for given cell
          rndNums=rndNums.filter((num)=>this.checkRow(this.hiddenMatrix,row, num) && this.checkCol(this.hiddenMatrix, col, num) && this.checkBox(this.hiddenMatrix,row,col,num))
          
         //Try out all the valid numbers from array
          while(rndNums.length!=0) {
              //Put the legal number into the board
              this.hiddenMatrix[row][col] = rndNums.pop()
              //Recursively call itself with modified board. Finish with true, when it's completely filled
              count = this.countSolutions(count)
            }
         //When no numbers left in array, it means no number is legal to be placed in a cell
         this.hiddenMatrix[row][col] = 0 //Assumption was wrong, so reset
          return count //Backtrack
         
     }
    //Hide random numbers in Sudoku board by setting their value to zero
    hideNumbers(showPercent) {
        let show = Math.floor(showPercent*this.SIZE*this.SIZE)
        
        for(let i=0;i<this.SIZE;i++) {
            for(let j=0;j<this.SIZE;j++) {
                this.hiddenMatrix[i][j]=this.matrix[i][j]
            }
        }

    let rndToHide=[]

    while(rndToHide.length<this.SIZE*this.SIZE-show) {
        let rndIndex = Math.floor(Math.random() * this.SIZE*this.SIZE)
        if(!rndToHide.includes(rndIndex)) rndToHide.push(rndIndex)
    }

    rndToHide.forEach(index => {
        this.hiddenMatrix[Math.floor(index/this.SIZE)][index%this.SIZE]=0
        
    });
    
}

    //Print the complete and solved version of the board
    printCompleteBoard() {
        console.log(`${this.name} (Solved)`)
        let strMat=''
        for(let i=0;i<this.SIZE;i++) {
            for(let j=0;j<this.SIZE;j++) {
                strMat+=this.matrix[i][j] + ' '
            }
            strMat+='\n'
        }
       console.log(strMat)
       
    }
    //Print the challenge game board (with hidden numbers)
    printHiddenBoard(showPercent) {
        console.log(`${this.name} (${showPercent*100}% shown)`)
        
        let strMat=''
        for(let i=0;i<this.SIZE;i++) {
            for(let j=0;j<this.SIZE;j++) {
                strMat+=this.hiddenMatrix[i][j] + ' '
            }
            strMat+='\n'
        }
       console.log(strMat)
    }
    
}


module.exports = Sudoku
