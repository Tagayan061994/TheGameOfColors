var name = prompt("Enter Your Name");
var storageKeys = {};
storageKeys[name] = name;
var winnerResult = document.getElementById("winnerResult");
var user = document.getElementById("user");
var score = document.getElementById("score");
var millisecond = 800;
var deg = 45;
var counter = 0;
var colors = ["red", "green", "blue", "yellow"];
var arrow = document.getElementById('arrow');
var clock = document.getElementById('clock');
var pointer = document.getElementById('pointer');
var button = document.getElementById('button');
var user_result = document.getElementById("user_result");
var score_result = document.getElementById("score_result");

user.innerText = name;
score.innerText = counter;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function changeBorderColors() {
    shuffle(colors);
    clock.style.borderTopColor = colors[0];
    clock.style.borderRightColor = colors[1];
    clock.style.borderBottomColor = colors[2];
    clock.style.borderLeftColor = colors[3];
}


function changeArrowColor(arr) {
    var colors = shuffle(arr);
    //let randNum = Math.floor(Math.random() * 4); if we need a random index for colors array
    arrow.style.backgroundColor = colors[0];
}


function rotateArrow() {
    pointer.style.transform = 'rotate(' + deg + 'deg)';

    if (deg + 1 == 404) {
        deg = 45;
    }
    deg++;
}

function checkWin() {
    if (counter === 5) {
        button.removeEventListener("click", checkWin);
        alert("You won,but you can try to make a record !!! ");
        getWin();
    }
}

function setWin(name, counter) {
    localStorage.setItem(storageKeys[name], name + " " + counter);
};

function getWin() {
    if (name && counter) {
        for (var key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                let li = document.createElement("li");
                li.innerHTML = localStorage[key];
                winnerResult.appendChild(li);
            }
        }
    }
};

setInterval(rotateArrow, 60 / 1000);
setInterval(changeArrowColor, millisecond, colors);

function compareColors() {
    if (deg > 45 && deg < 135 && clock.style.borderRightColor === arrow.style.backgroundColor) {
        //alert("right border");
        console.log(clock.style.borderRightColor);
        console.log(arrow.style.backgroundColor);
        counter++;
        score.innerText = counter;
        millisecond -= 100;
        setWin(name, counter)
    } else if (deg > 135 && deg < 225 && clock.style.borderBottomColor === arrow.style.backgroundColor) {
        //alert("bottom border");
        console.log(clock.style.borderBottomColor);
        console.log(arrow.style.backgroundColor);
        counter++;
        score.innerText = counter;
        millisecond -= 100;
        setWin(name, counter);
    } else if (deg > 225 && deg < 315 && clock.style.borderLeftColor === arrow.style.backgroundColor) {
        //alert("left border");
        console.log(clock.style.borderLeftColor);
        console.log(arrow.style.backgroundColor);
        counter++;
        score.innerText = counter;
        millisecond -= 100;
        setWin(name, counter);
    } else if (deg > 315 && deg < 405 && clock.style.borderTopColor === arrow.style.backgroundColor) {
        //alert("top border");
        console.log(clock.style.borderTopColor);
        console.log(arrow.style.backgroundColor);
        counter++;
        score.innerText = counter;
        millisecond -= 100;
        setWin(name, counter);
    }
    console.log(millisecond);
}
button.addEventListener("click", compareColors);
button.addEventListener("click", changeBorderColors);
button.addEventListener("click", checkWin);

