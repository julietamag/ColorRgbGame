// let colors = ['rgb(78, 2, 80)', 'rgb(128, 26, 134)','rgb(100, 89, 134)','rgb(143, 227, 136)','rgb(88, 188, 130)', 'rgb(56, 167, 0)'];
let colors = [];

const squares = document.querySelectorAll('.square');
let clickedColor = '';
let clickedSquare;
let randomCol;
let numberOfSquares = 6;
let innerMessage = document.getElementById('message');
const container = document.getElementsByClassName('square');
const easyBtn = document.getElementById('easyButton');
const hardBtn = document.getElementById('hardButton');
const nameDisplayer = document.getElementById('nameDisplayer');
const elemReset = document.getElementById('reset');
const resetBtn = document.getElementById('resetBtn')
const attempt = document.getElementById('attempt-number');
const score = document.getElementById('score-number');
let numAttempt = 0;
let numScore = 0;

function init() {
    // event listener to restart game with new colors
    elemReset.addEventListener('click', reset);
    reset();
    // event listeners for the clicked square
//     for (let i = 0; i < colors.length; i++) {
//         squares[i].addEventListener('click', getRgb);
//    }
}

window.addEventListener("load", () => {
    init()
  });

// loop over the array of colors and fill all the squares with each
function colorAllSquares() {
    for (let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener('click', getRgb);
        console.log(colors)
    }
}

// random color index
function pickColor() {
    return Math.floor(Math.random() * colors.length)
}

// create a random rgb color
function randomColor() {
    randomCol = Math.floor(Math.random() * 255);
    return randomCol;
}

// push the randomly generated color to the array of colors
function generateRandomColors(num) {
    while (num > 0) {
        const color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        colors.push(color);
        num--;
    }
}

//generate the random array of colors and choose one to be the chosen color.
generateRandomColors(numberOfSquares);
let pickedColor = colors[pickColor()];

//  functionality: 
// if click on wrong color = change the backgrnd color to the same as body and display fail message 
// if click on right color = change the backgrnd color of all the squares to the same of the winner and display success message 
function getRgb(e) {
    clickedSquare = e.target;
    clickedColor = window.getComputedStyle(e.target).backgroundColor;
    if (clickedColor !== pickedColor) {
        const elem = document.body;
        const color = window.getComputedStyle(elem, null).getPropertyValue('background-color');
        clickedSquare.style.backgroundColor = color;
        innerMessage.innerHTML = 'Try Again';
        attemptIncrement();
    }
    if (clickedColor == pickedColor) {
        innerMessage.innerHTML = 'Correct!';
        elemReset.innerHTML = 'Play again!';
        changeColor(pickedColor);
        nameDisplayer.style.backgroundColor = pickedColor;
        scoreIncrement();
        numAttempt = 0;
    }
}

// assistant function: change the backgorund color of all the squares to the right color 
function changeColor(color) {
    for (let i = 0; i < container.length; i++) {
        container[i].style.backgroundColor = color;
    }
}

// display the chosen rgb on the h2 tag
document.getElementById('colorDisplay').innerHTML = pickedColor;

// restart game with new colors
function reset() {
    colors = [];
    numAttempt = 0;
    generateRandomColors(numberOfSquares);
    pickedColor = colors[pickColor()];
    document.getElementById('colorDisplay').innerHTML = pickedColor;
    innerMessage.innerHTML = '';
    elemReset.innerHTML = 'New Colors';
    nameDisplayer.style.backgroundColor = '#48A9A6';
    attempt.innerHTML = numAttempt;
    score.innerHTML = numScore
    colorAllSquares();
}

//change game level to hard
hardBtn.addEventListener('click', () => {
    hardBtn.className = 'selected';
    easyBtn.className = '';
    numberOfSquares = 6;
    reset();
})

//change game level to easy
easyBtn.addEventListener('click', () => {
    easyBtn.className = 'selected';
    hardBtn.className = '';
    numberOfSquares = 3;
    if(numberOfSquares == 3){
        for (let i = 0; i < container.length; i++){
            if (colors[i] !== undefined){
                container[i].style.display = 'none';
            }
        } 
    }
    // colors = colors.slice(0, 3);
    // hide the last 3 sqaures
    // for (let i = 0; i < container.length; i++) {
    //     if (colors[i] !== undefined) {
    //         container[i].style.backgroundColor = colors[i];
    //     } else {
    //         container[i].style.display = 'none';
    //     }
    reset();
})

// attempts functionality
function attemptIncrement() {
    if (clickedColor !== pickedColor) {
        numAttempt++;
        attempt.innerHTML = numAttempt;
    }
}

// scores functionality
function scoreIncrement() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', getRgb);
    }
    if (numAttempt == 0) {
        numScore += 2;
        score.innerHTML = numScore
    }
    if (numAttempt == 1) {
        numScore++;
        score.innerHTML = numScore
    }

}


// reset game button 
resetBtn.addEventListener('click', reset);
// resetBtn.removeEventListener('click', reset())

