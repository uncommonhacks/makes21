var clicked = false;

let updateSticky = function () {
  if (window.innerWidth < 951) {
    let lefts = document.querySelectorAll(".left");

    for (let i = 0; i < lefts.length; i++) {
      let left = lefts[i];

      left.style.position = "relative";
      left.style["padding-top"] = 0;
      left.style["padding-bottom"] = 0;
      left.style["margin-bottom"] = 0;
      left.style.top = "auto";
    }

    return;
  }

  let sections = document.getElementsByClassName("section");
  for (let i = 0; i < sections.length; i++) {
    let section = sections.item(i);

    let left = null;
    let right = null;
    if (i % 2 == 0) {
      left = section.children[0];
      right = section.children[1];
    } else {
      left = section.children[1];
      right = section.children[0];
    }

    // Use sticky to get the images to stay centered
    if (right.clientHeight > window.innerHeight) {
      let img = left.children[0];
      let offset = window.innerHeight / 2 - img.clientHeight / 2 + "px";

      left.style.position = "sticky";
      left.style.position = "-webkit-sticky";
      left.style["padding-top"] = offset;
      left.style["padding-bottom"] = offset;
      left.style["margin-bottom"] = "auto";
      left.style.top = 0;
    }
  }
};

window.onload = function () {
  updateSticky();
};
window.onresize = function () {
  updateSticky();
};
window.addEventListener("click", (event) => {
  if (!clicked) {
    const rain = document.getElementById("rainSounds");
    rain.volume = 0.2;
    rain.play();
    rain.loop = true;
    const neon = document.getElementById("neonSounds");
    neon.volume = 1;
    neon.play();
    var a = setInterval(function () {
      turnNeonOff(neon, a);
    }, 200);
    neon.loop = true;
  }
  clicked = true;
});
function turnNeonOff(neon, a) {
  if (neon.volume > -10) {
    neon.volume = Math.max(neon.volume * 0.96, 0.1);
  } else {
    clearInterval(a);
    console.log(a);
  }
}

let headShotsList = [
  "img/headshots/angelaSerious.png",
  "img/headshots/angelaShaSerious.png",
  "img/headshots/anneSerious.png",
  "img/headshots/antonSerious.png",
  "img/headshots/christianSerious.jpg",
  "img/headshots/dashaSerious.png",
  "img/headshots/jimSerious.jpg",
  "img/headshots/joeSerious.png",
  "img/headshots/kateSerious.jpg",
  "img/headshots/nickSerious.png",
  "img/headshots/thomasSerious.png",
  "img/headshots/reneeSerious.png",
  "img/headshots/samanthaSerious.jpg",
  "img/headshots/spencerSerious.png",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let currentPicture = getRandomInt(headShotsList.length);
let headShot = document.getElementById("headshots");

headShot.setAttribute("src", headShotsList[currentPicture]);
setInterval(() => {
  currentPicture =
    currentPicture == headShotsList.length - 1 ? 0 : currentPicture + 1;
  headShot.setAttribute("src", headShotsList[currentPicture]);
}, 2000);
