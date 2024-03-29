var game = document.getElementById("game");
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var enemies = document.getElementById("enemies");
var mountains = document.getElementById("mountains");
var character = document.getElementById("character");
var jumping = 0;
var modalUp = 1;
var counter = 0;
var lives = 5;
var refreshInterval = 0;
var instance = 0;


var heart1 = document.getElementById("heart1");
var heart2 = document.getElementById("heart2");
var heart3 = document.getElementById("heart3");
var heart4 = document.getElementById("heart4");
var heart5 = document.getElementById("heart5");
var startBtn = document.getElementById("startBtn");
var closeBtn = document.getElementById("closeBtn");
var vidOverlay = document.getElementById("vidOverlay");

window.onload = setTimeout(hideVidOverlay, 4000);

function hideVidOverlay() {
    vidOverlay.style.display = "none";
}

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
        enemies.style.height = (random + 500) + "px";
    mountains.style.top =  650 + random + "px";
    mountains.style.height = (500 - (random + 500) - 150) + "px";
    counter++;
    score.innerHTML = counter;
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function openModal() {
    
    jumping=1;
    modalUp=1;
    lives = lives - 1;
    livesRemaining.innerHTML = "Lives Remaining: " + lives;
    if(lives<5){heart5.style.display = "none";};
    if(lives<4){heart4.style.display = "none";};
    if(lives<3){heart3.style.display = "none";};
    if(lives<2){heart2.style.display = "none";};
    if(lives<1){heart1.style.display = "none";
                closeBtn.style.display = "none";
                loadingNextGame.style.display = "block";
                livesRemaining.innerHTML = 'Final Score: <span style="color: #ff004a; font-weight: bold;">' + counter + '</span><br><b>🎉 Congratulations! 🎊</b>';
                pleaseWait.style.display = "block";
                gameOver.innerHTML = "GAME OVER!";
                gameOver.style.transform = "scale(1.3)";
                gameOver.style.color = "#ff004a";
                gameOver.style.fontFamily = "'Silkscreen',Helvetica,Arial,sans-serif";
                gameOver.style.marginBottom = "20px";
                gameOver.style.marginTop = "6px";
                livesRemaining.style.fontSize = "16pt";
               };
    


    modal.style.display = "block";


};

function goToStore() {
    window.location.href = "https://shop-polka-git-kiosk4-1-burkaloo.vercel.app/";
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    hole.style.animationName = "none";
        block.style.animationName = "none";
    enemies.style.animationName = "none";
    mountains.style.animationName = "none";
        
        requestAnimationFrame(() => {
            hole.style.animationName = "";
            block.style.animationName = ""; 
            enemies.style.animationName = "";
            mountains.style.animationName = "";
        });
    
    character.style.top = 225 + "px";
    modal.style.display = "none";


    resumeTime();

};



document.body.onkeydown = function(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    jump();
  }
};

document.onclick = function() {jump()};


function resumeTime(){
    console.log("Time has resumed!");
    jumping = 0;
    modalUp = 0;
    block.style.animationPlayState = 'running';
    hole.style.animationPlayState = 'running';
    enemies.style.animationPlayState = 'running';
    mountains.style.animationPlayState = 'running';
    
    var normalInterval = setInterval(function(){
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop);
    if((characterTop>465)||((blockLeft<95)&&(blockLeft>25)&&((cTop<holeTop)||(cTop>holeTop+115)))){
        jumping = 1;
        block.style.animationPlayState = 'paused';
        hole.style.animationPlayState = 'paused';
        enemies.style.animationPlayState = 'paused';
        mountains.style.animationPlayState = 'paused';
        modalUp = 1;
        clearInterval(normalInterval);
        openModal();
        
    }
        

    },10);};
        
        


function jump(){

    if(modalUp==0){jumping = 1;
    let jumpCount = 0;
    document.getElementById('character').style.transform = "rotate(-45deg)";
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        };
        if(jumpCount>20){
            clearInterval(jumpInterval);
            document.getElementById('character').style.transform = "rotate(35deg)";
            jumpCount=0;
            jumping=0;
        }
        jumpCount++;
    },10);
};
    if(modalUp==1){jumping=1};
};

startBtn.onclick = function() {
    startMenu.style.display = "none";
    resumeTime()};



