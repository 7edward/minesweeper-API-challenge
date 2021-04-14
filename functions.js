//default configuration const
const mines = {
    numTotalMines: 30,
    numFoundMines: 0,
    numRows: 15,
    numCols: 15,
    minesField: [],
    bombIcon: String.fromCodePoint(0x0001F4A3),
}

var completeMatrix = new Array();
var timer;
var clicks = 0;

//Main method to draw the chart based on the selected difficulty
function drawTable(difficulty){
    setDifficulty(difficulty)
    completeMatrix = new Array();
    
    let tablero = document.querySelector("#tablero");
     for(let f=0; f<mines.numRows; f++){
        for(let c=0; c<mines.numCols; c++){
            let newDiv = document.createElement("div");
                newDiv.setAttribute("id","f" + f + "_c" + c);
                newDiv.dataset.fila = f;
                newDiv.dataset.columna = c;
                newDiv.dataset.bomb = false;
                newDiv.dataset.number = '';
                newDiv.innerHTML = Math.floor(Math.random() * (mines.numRows - mines.numTotalMines));
                newDiv.addEventListener('click',uncover,false);
                newDiv.addEventListener('click',setNumber,false);
                newDiv.addEventListener('click',onClick,false);
                tablero.appendChild(newDiv);
                completeMatrix.push(["f" + f + "_c" + c,f,c]);
                
                //console.warn(completeMatrix);
                //mine[f][c]="f" + f + "_c" + c;
                  
        }
        
    }
    //for(let e=0; e<mines.numTotalMines; e++){
        setBombs(completeMatrix,0, mines.numCols); 
        //setNumber(completeMatrix,(mines.numRows*mines.numCols));
        setNumber(mines.numRows,mines.numCols);
    //}
    //console.warn(completeMatrix[0][2]);

    if (document.getElementById('spanTimer')){
        document.getElementById('spanTimer').innerHTML = '';
    }
    resetTimer();
    startTimer();
}

function startTimer() {
    var seconds = 0;
    timer = setInterval(function() {
    seconds ++;
    document.getElementById("spanTimer").innerText = seconds;
     }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

function onClick() {  
    clicks += 1;
    document.getElementById("spanMoves").innerHTML = clicks;
};

//Method to setup the difficulty
function setDifficulty(difficulty){
    if(document.getElementById("tablero")){
        document.getElementById("tablero").innerHTML = '';
    }
    document.getElementById('spanState').innerHTML='Good!';
    document.getElementById('spanState').style.color= "green";
    if(difficulty == 1){
        console.log('EASY');
        mines.numRows = 10;
        mines.numCols = 10;
        mines.numTotalMines = 20;
        console.log('TOTAL MINES: '+mines.numTotalMines);
    }
    if(difficulty == 2){
        console.log('MEDIUM');
        mines.numRows = 15;
        mines.numCols = 15;
        mines.numTotalMines = 30;
        console.log('TOTAL MINES: '+mines.numTotalMines);

    }
    if(difficulty == 3){
        console.log('HARD');
        mines.numRows = 30;
        mines.numCols = 30;
        mines.numTotalMines = 99;
        console.log('TOTAL MINES: '+mines.numTotalMines);

    }
    document.documentElement.style.setProperty('--num-columnas',  mines.numRows);
    document.documentElement.style.setProperty('--num-filas',  mines.numCols);
    document.getElementById('spanTotalMines').innerHTML=mines.numTotalMines;

}

//Method to setup the bombs based on the difficulty
function setBombs(matrix,min, max){
    matrix.forEach(element => {
        let startSetAt =  Math.floor(Math.random() * (max - min));
        let endSetAt =  Math.floor(Math.random() * (max - min));
        var id = "f" + startSetAt + "_c" + endSetAt;
         if(mines.numTotalMines >= 0){
            let eleB = document.getElementById(id);
            eleB.innerHTML = mines.bombIcon;
            eleB.innerHTML = '';
            eleB.dataset.bomb = true;
            mines.numTotalMines--;
            console.log('Mine set at: '+id);    
        }
    });
    
}

//Method to setup the numbers based on the neighbors and chart and if not exists one bomb on specific position
function setNumber(i,j){

    var rowLimit = i-1;
    var columnLimit = j-1;
    
    for(var x =0; x <=  rowLimit; x++) {
      for(var y = 0; y <= columnLimit; y++) {
        let ele = document.getElementById("f" + x + "_c" + y);
        var n = 0;

        var leftN = x - 1;
        var rightN = x + 1;

        var topN = y - 1;
        var bottomN = y + 1;

        var northwest = "f" + (x - 1)+"_c"+(y-1); 
        var northeast = "f" + (x - 1)+"_c"+(y+1); 
        var southwest = "f" + (x + 1)+"_c"+(y-1); 
        var southeast = "f" + (x + 1)+"_c"+(y+1);  


        var leftNele = document.getElementById("f" + leftN + "_c" + y);
        var rightNele = document.getElementById("f" + rightN + "_c" + y);

        var topNele = document.getElementById("f" + x + "_c" + topN);
        var bottomNele = document.getElementById("f" + x + "_c" + bottomN);

        var leftTopCorner = document.getElementById(northwest);
        var rightTopCorner = document.getElementById(northeast);

        var leftBottomCorner = document.getElementById(southwest);
        var rightBottomCorner = document.getElementById(southeast);

        if(typeof(leftNele) != 'undefined' && leftNele != null){
            if(leftNele.dataset.bomb == 'true'){
                n++;
            }
        }
        if(typeof(rightNele) != 'undefined' && rightNele != null){
            if(rightNele.dataset.bomb == 'true'){
                n++;
            }
        }
        if(typeof(topNele) != 'undefined' && topNele != null){
            if(topNele.dataset.bomb == 'true'){
                n++;
            }
        }
        if(typeof(bottomNele) != 'undefined' && bottomNele != null){
            if(bottomNele.dataset.bomb == 'true'){
                n++;
            }
        }
        //@#CORNERS
        if(typeof(leftTopCorner) != 'undefined' && leftTopCorner != null){
            if(leftTopCorner.dataset.bomb == 'true'){
                n++;
            }
        }
        if(typeof(rightTopCorner) != 'undefined' && rightTopCorner != null){
            if(rightTopCorner.dataset.bomb == 'true'){
                n++;
            }
        }
        if(typeof(leftBottomCorner) != 'undefined' && leftBottomCorner != null){
            if(leftBottomCorner.dataset.bomb == 'true'){
                n++;
            }
        }
        if(typeof(rightBottomCorner) != 'undefined' && rightBottomCorner != null){
            if(rightBottomCorner.dataset.bomb == 'true'){
                n++;
            }
        }



        if(ele.dataset.bomb == 'false'){
            ele.dataset.number = n;
            ele.innerHTML = '';
        }
       }
    }

    /*matrix.forEach(element => {
        //console.log('NUMBER ID '+element[0]);    
        ele = document.getElementById(element[0]);
        let endSetAt =  Math.floor(Math.random() * max) + 1;
        if(ele.dataset.bomb == 'false'){
            //ele.innerHTML = endSetAt;
            ele.dataset.number = endSetAt;
            ele.innerHTML = "";
         }else{
           // ele.innerHTML= "";
         }  
        
    });*/
}

//Method to uncover cell on click
function uncover(e){
let element = e.currentTarget;
        ele = document.getElementById(element.id);
        ele.style.background= "000000";
        if(ele.dataset.bomb == 'true'){
        ele.innerHTML = mines.bombIcon;
         document.getElementById('spanState').innerHTML='Died!';
         document.getElementById('spanState').style.color= "red";

        }else{
        ele.innerHTML= ele.dataset.number;
        }
             
}
