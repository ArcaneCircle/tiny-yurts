import {
  svgElement,
  boardOffsetX,
  boardOffsetY,
  gridWidth,
  gridHeight,
} from "./svg";
import { svgPxToDisplayPx } from "./cell";
import { menuBackground } from "./menu-background";
import { createElement } from "./create-element";
import {
  gridToggleTooltip,
  gridRedToggleTooltip,
  soundToggleTooltip,
  uiContainer,
} from "./ui";
import { initAudio } from "./audio";

const menuWrapper = createElement();
const menuHeader = createElement();
export const menuText1 = createElement();
const menuButtons = createElement();
const startButtonWrapper = createElement();
const startButton = createElement("button");

export const initMenu = (startGame) => {
  menuWrapper.style.cssText = `
    position: absolute;
    inset: 0;
    padding: 10vmin;
    display: flex;
    flex-direction: column;
  `;
  menuWrapper.style.pointerEvents = "none";

  // This has to be a sibling element, behind the gameoverScreen, not a child of it,
  // so that the backdrop-filter can transition properly
  menuBackground.style.clipPath =
    "polygon(0 0, calc(20dvw + 400px) 0, calc(20dvw + 350px) 100%, 0 100%)";

  menuHeader.style.cssText = `font-size: 72px; opacity: 0;`;
  menuHeader.innerText = "Tiny Yurts";

  // Everything but bottom margin
  menuText1.style.cssText = `margin: auto 4px 0; opacity:0;`;

  if (window.highscores.getScore()) {
    menuText1.innerText = `Highscore: ${window.highscores.getScore()}`;
  }

  startButton.innerText = "Start";
  startButton.addEventListener("click", () => {
    initAudio();
    startGame();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      // console.log(screen.orientation.lock());
      // The catch prevents an error on browsers that do not support or do not want
      // to allow locking to landscape. Could remove, but having an error is risky
      screen.orientation.lock("landscape").catch(() => {});
    }
  });
  startButtonWrapper.style.opacity = 0;

  menuButtons.style.cssText = `display: grid; gap: 16px; margin-top: 48px;`;
  startButtonWrapper.append(startButton);

  menuButtons.append(startButtonWrapper);

  menuWrapper.append(menuHeader, menuButtons, menuText1);

  document.body.append(menuWrapper);
};

export const showMenu = (focus, firstTime) => {
  menuWrapper.style.pointerEvents = "";
  menuBackground.style.clipPath = `polygon(0 0, calc(20dvw + 400px) 0, calc(20dvw + 350px) 100%, 0 100%)`;
  menuBackground.style.transition = `clip-path 1s, opacity 2s`;
  menuHeader.style.transition = `opacity .5s 1s`;
  startButtonWrapper.style.transition = `opacity .5s 1.4s`;
  menuText1.style.transition = `opacity .5s 1.6s`;

  // First time the game is loaded, the menu background needs to be fast
  if (firstTime) {
    menuBackground.style.transition = `opacity 0s`;
    menuHeader.style.transition = `opacity .5s .4s`;
    startButtonWrapper.style.transition = `opacity .5s .8s`;
    menuText1.style.transition = `opacity .5s 1s`;
  }

  menuText1.innerHTML = window.highscores.getScore()
    ? `Highscore: ${window.highscores.getScore()}`
    : "Tip: Left click & drag to connect yurts to<br>farms, or delete paths with right click.";

  const farmPxPosition = svgPxToDisplayPx(
    focus.x - gridWidth / 2 - boardOffsetX + focus.width / 2,
    focus.y - gridHeight / 2 - boardOffsetY + focus.height / 2,
  );
  const xOffset = innerWidth / 4; // TODO: Calculate properly?
  svgElement.style.transition = "";
  svgElement.style.transform = `translate(${xOffset}px, 0) rotate(-17deg) scale(2) translate(${-farmPxPosition.x}px, ${-farmPxPosition.y}px)`;

  uiContainer.style.zIndex = 1;
  menuBackground.style.opacity = 1;
  menuHeader.style.opacity = 1;
  menuText1.style.opacity = 1;
  startButtonWrapper.style.opacity = 1;
};

export const hideMenu = () => {
  menuWrapper.style.pointerEvents = "none";
  uiContainer.style.zIndex = "";

  menuBackground.style.transition = `opacity 1s .6s`;
  menuHeader.style.transition = `opacity .3s .4s`;
  startButtonWrapper.style.transition = `opacity .3s .2s`;
  menuText1.style.transition = `opacity.3s.1s`;

  menuBackground.style.opacity = 0;
  startButtonWrapper.style.opacity = 0;
  menuText1.style.opacity = 0;
  menuHeader.style.opacity = 0;

  soundToggleTooltip.style.opacity = 0;
  gridRedToggleTooltip.style.opacity = 0;
  gridToggleTooltip.style.opacity = 0;
  soundToggleTooltip.style.width = 0;
  gridRedToggleTooltip.style.width = 0;
  gridToggleTooltip.style.width = 0;
};
