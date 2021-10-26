const adventure = document.querySelector(".adventure");
const background = document.querySelector(".background");
let isJump = false;
let position = 0;
let points = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJump) {
      jump();
    }
  }
}

function jump() {
  isJump = true;
  let upInterval = setInterval(() => {
    if (position >= 250) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJump = false;
        } else {
          position -= 50;
          adventure.style.bottom = position + "px";
        }
      }, 50);
    } else {
      position += 50;
      adventure.style.bottom = position + "px";
    }
  }, 50);
}

function createskeleton() {
  const skeleton = document.createElement("div");
  let skeletonPosition = 1200;
  let randomTime = Math.random() * 10000;

  skeleton.classList.add("skeleton");
  skeleton.style.left = 1100 + "px";
  background.appendChild(skeleton);

  

  let leftInterval = setInterval(() => {
    if (skeletonPosition < 5) {
      clearInterval(leftInterval);
      background.removeChild(skeleton);
      points += 10;
    } else if (skeletonPosition > 0 && skeletonPosition < 60 && position < 51) {
      clearInterval(leftInterval);
      document.body.innerHTML = `
    '<h1 class="game-over">Game Over</h1> <br> <p class="points">Pontos: ${points}</p>'
    `;
    } else {
      skeletonPosition -= 10;
      skeleton.style.left = skeletonPosition + "px";
    }
  }, 30);
  
  setTimeout(createskeleton, randomTime);
  

}

createskeleton();

function special(event) {
  if (event.keyCode === 13) {
    console.log('kill skeleton')
  }
}

document.addEventListener("keyup", handleKeyUp);
document.addEventListener("keyup", special);
