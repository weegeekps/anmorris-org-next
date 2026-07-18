import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render/auto-render.js";
import katex from "katex";

console.debug(
  `KaTeX loaded. Rendering $$ and $ delimiters. Version: ${katex.version}`,
);

document.addEventListener("DOMContentLoaded", () => {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
  });
});
