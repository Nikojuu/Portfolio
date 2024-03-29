import * as observers from "./observers";
import * as cookies from "./cookie-consent";

tsParticles.load("particles", {
  fps_limit: 60,
  fullScreen: {
    enable: false,
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: true, mode: "push" },
      onhover: {
        enable: true,
        mode: "repulse",
        parallax: { enable: true, force: 60, smooth: 10 },
      },
      resize: false,
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3,
      },
      grab: { distance: 400, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    line_linked: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      bounce: false,
      direction: "none",
      enable: true,
      outModes: "out",
      random: false,
      speed: 2,
      straight: false,
    },
    number: { density: { enable: true, value_area: 800 }, value: 80 },
    opacity: {
      anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
      random: false,
      value: 0.5,
    },
    shape: {
      character: {
        fill: false,
        font: "Verdana",
        style: "",
        value: "*",
        weight: "400",
      },
      // image: {
      //   height: 100,
      //   replace_color: true,
      //   src: "images/github.svg",
      //   width: 100,
      // },
      polygon: { nb_sides: 5 },
      stroke: { color: "#000000", width: 0 },
      type: "circle",
    },
    size: {
      anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
      random: true,
      value: 5,
    },
  },
  polygon: {
    draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
    move: { radius: 10 },
    scale: 1,
    type: "none",
    url: "",
  },
  retina_detect: true,
});

const typewriter = document.querySelector(".heading__typewriter");

const sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const phrases = ["Web-kehittäjä", "Front-end kehittäjä", "Web-suunnittelija"];

let sleepTime = 100;

let curPhraseIndex = 0;

const writeLoop = async () => {
  while (true) {
    let curWord = phrases[curPhraseIndex];

    for (let i = 0; i < curWord.length; i++) {
      typewriter.innerText = curWord.substring(0, i + 1);
      await sleep(sleepTime);
    }

    await sleep(sleepTime * 20);

    for (let i = curWord.length; i > 0; i--) {
      typewriter.innerText = curWord.substring(0, i - 1);
      await sleep(sleepTime);
    }
    await sleep(sleepTime * 5);

    if (curPhraseIndex === phrases.length - 1) {
      curPhraseIndex = 0;
    } else {
      curPhraseIndex++;
    }
  }
};

writeLoop();
//////////Navigation////////////
const checkbox = document.getElementById("check");
const menu = document.querySelector("nav");

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    checkbox.checked = false;
  }
});

/////////copyright year
let date = new Date().getFullYear();
document.getElementById("year").innerHTML = date;

//////
let codeActive = true;
let start = new Date().getTime();
const targetDiv = document.querySelector(".heading-section");

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition,
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"],
};

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  selectRandom = (items) => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
  px = (value) => withUnit(value, "px"),
  ms = (value) => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start, end) => end - start;

const appendElement = (element) => targetDiv.appendChild(element),
  removeElement = (element, delay) =>
    setTimeout(() => targetDiv.removeChild(element), delay);

const createStar = (position) => {
  const star = document.createElement("span"),
    color = selectRandom(config.colors);

  star.className = "star fa-solid fa-star";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
};

const createGlowPoint = (position) => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow);

  removeElement(glow, config.glowDuration);
};

const determinePointQuantity = (distance) =>
  Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

/* --  

The following is an explanation for the "createGlow" function below:

I didn't cover this in my video, but I ran into an issue where moving the mouse really quickly caused gaps in the glow effect. Kind of like this:

*   *       *       *    *      *    🖱️

instead of:

*************************************🖱️

To solve this I sort of "backfilled" some additional glow points by evenly spacing them in between the current point and the last one. I found this approach to be more visually pleasing than one glow point spanning the whole gap.

The "quantity" of points is based on the config property "maximumGlowPointSpacing".

My best explanation for why this is happening is due to the mousemove event only firing every so often. I also don't think this fix was totally necessary, but it annoyed me that it was happening so I took on the challenge of trying to fix it.

-- */
const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
    quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity,
    dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index,
      y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
};

const updateLastStar = (position) => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
};

const updateLastMousePosition = (position) => (last.mousePosition = position);

const adjustLastMousePosition = (position) => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = (e) => {
  if (!codeActive) return;
  const mousePosition = { x: e.clientX, y: e.clientY };

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime(),
    hasMovedFarEnough =
      calcDistance(last.starPosition, mousePosition) >=
      config.minimumDistanceBetweenStars,
    hasBeenLongEnough =
      calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  if (hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    updateLastStar(mousePosition);
  }

  createGlow(last.mousePosition, mousePosition);

  updateLastMousePosition(mousePosition);
};
const updateCodeActive = () => {
  codeActive = window.scrollY === 0;
};

// Check and update codeActive when the page loads
updateCodeActive();

// Disable the code when scrolling starts
window.addEventListener("scroll", () => {
  updateCodeActive();

  if (!codeActive) {
    // If you want to re-enable the code after a certain delay, you can use setTimeout
    setTimeout(() => {
      updateCodeActive();
      if (codeActive) {
        // Reactivate the code only if the user is still at the top
        // You may adjust this logic based on your specific needs
      }
    }, 1000); // Adjust the delay (in milliseconds) as needed
  }
});

targetDiv.addEventListener("mousemove", (e) => handleOnMove(e));
targetDiv.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
targetDiv.addEventListener("mouseleave", () =>
  updateLastMousePosition(originPosition)
);
