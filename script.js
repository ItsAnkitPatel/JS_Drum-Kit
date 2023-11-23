//Storing all keys & audio before because using querySelector for each key (also for unnecessary key) is not efficient
const musicKeys = Array.from(document.querySelectorAll(".box"));

const audio = Array.from(document.querySelectorAll("audio"));

window.addEventListener("keydown", findKeyAndAudio);


function findKeyAndAudio(e) {

  
  let val;
  if(e.key){ //This means the event comes from the keyboard
    val=e.key
  }else{ // This means the event comes from the cursor click
    val = e
  }

  const keyFound = musicKeys.find(
    (key) => key.getAttribute("data-key") === val
  );
  if (keyFound) {
    //If the key is found then only we need to search for the audio
    const audioFound = audio.find(
      (currentAudio) => currentAudio.getAttribute("data-key") === val
    );

    playSound(keyFound, audioFound);
  }
}

function playSound(currentKey, currentAudio) {
    currentKey.classList.add("playing");
    currentAudio.currentTime = 0;
    currentAudio.play();
  }
function mouseClicked(e){ // This function is for click event
    if(e.target.innerText.length===1){// Doing check because we do not want to pass the span innerText
        findKeyAndAudio(e.target.innerText.toLowerCase())
    }
}


const keys = document.querySelectorAll(".box");
keys.forEach((key)=> key.addEventListener('click',mouseClicked))
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

function removeTransition(e) {
  if (e.propertyName !== "transform") return; // stop the function

  e.target.classList.remove("playing");
}
