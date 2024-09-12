var bubble = "";
var hit = 0;
var time = 7;
var bubblevalue2 = 0;
var scoredata = 0;
var timerstop = null;

function makeBubble() {
    // Clear previous bubbles
    // bubble = ""; // Reset bubble content
    for (var i = 1; i <= 168; i++) {
        var data = Math.floor(Math.random() * 10);
        bubble += `<div class="bubble">${data}</div>`;
    }
    document.querySelector("#bootompanel").innerHTML = bubble;
}

function showYouPly() {
    // Hide all the bubbles using querySelectorAll and display: none
    document.querySelectorAll(".bubble").forEach(function (element) {
        element.style.display = "none";
    });

    // Show the "play again" options
    const data = `
        <div class="playorno">
            <h1 id="h1">Do you want to play again?</h1>
            <button id="btn1" onclick="restartGame()">Yes</button>
            <button id="btn2" onclick="endGame()">No</button>
        </div>`;
    document.querySelector("#bootompanel").innerHTML = data;
}

function score() {
    scoredata += 10;
    document.querySelector("#score").innerHTML = scoredata;
}

function clickBubble() {
    document.querySelector("#bootompanel").addEventListener("click", function (event) {
        if (event.target.classList.contains("bubble")) {
            var bubblevalue = Number(event.target.textContent);
            bubblevalue2 = bubblevalue;
            if (hit === bubblevalue) {
                score();
                makeBubble();
                newHit();
            } else {
                alert("You clicked the wrong key");
                clearInterval(timerstop);
                showYouPly();
            }
        }
    });
}

function newHit() {
    hit = Math.floor(Math.random() * 10);
    document.querySelector("#hit").innerHTML = hit;
}

function timer() {
    // Ensure all bubbles are displayed using querySelectorAll
    document.querySelectorAll(".bubble").forEach(function (element) {
        element.style.display = "block";
    });

    makeBubble(); // Create bubbles
    
    newHit();// Enable bubble clicks

    // Reset and show the timer
    document.querySelector("#timer").textContent = time;

    // Clear previous timer if any
    if (timerstop) {
        clearInterval(timerstop);
    }

    timerstop = setInterval(function () {
        if (time > 0) {
            time--;
            document.querySelector("#timer").textContent = time;
        } else {
            clearInterval(timerstop);
            alert("Time out");
            showYouPly();
        }
    }, 1000);
}

function restartGame() {
    // Reset game variables
    scoredata = 0;
    time = 60; // Reset time as well
    document.querySelector("#score").innerHTML = scoredata;

    // Hide the play again prompt and restart the game
    document.querySelector("#bootompanel").innerHTML = "";

    timer(); // Restart the game with a new timer
}

function endGame() {
   
    document.querySelector("#bootompanel").innerHTML = ""; // Clear the game screen
}

// Initialize the game
timer();

clickBubble(); 
