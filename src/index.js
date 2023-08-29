import "./overrides.scss";
import CueCodeHighlight from "./plugins/cue-code-highlight";
import External from "./plugins/external";
import confetti from "canvas-confetti";
import Reveal from "reveal.js";
import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import Highlight from "reveal.js/plugin/highlight/highlight";
import "reveal.js/plugin/highlight/monokai.css";

const deck = new Reveal({
  hash: true,
  plugins: [External, Highlight, CueCodeHighlight],
});
deck.initialize();

setupConfetti();

function setupConfetti() {
  const svg = document.getElementById("confetti");
  svg.setAttribute("width", window.innerWidth);
  svg.setAttribute("height", window.innerHeight);

  const throwConfetti = confetti.create(svg, {
    resize: true,
    useWorker: true,
    disableForReducedMotion: true,
  });
  deck.addEventListener("slidechanged", () => {
    if (deck.getCurrentSlide().classList.contains("confetti")) {
      setTimeout(() => {
        throwConfetti({
          origin: { x: 0.5, y: 1.5 },
        });
      }, 300);
    }
  });
}
