window.CueCodeHighlight = () => {
  let ignoreChange = true;
  let history = [];
  return {
    id: "cue-code-highlight",
    init: (reveal) => {
      reveal.addEventListener("slidechanged", onSlideChanged);
      reveal.addEventListener("fragmentshown", onFragmentShown);
      reveal.addEventListener("fragmenthidden", onFragmentHidden);

      function onSlideChanged(e) {
        if (ignoreChange) {
          ignoreChange = false;
          return;
        }

        history = [];

        const fragments = getSortedVisibleFragments();
        handleInitialFragments(fragments);
      }

      function getSortedVisibleFragments() {
        const fragments = reveal
          .getCurrentSlide()
          .querySelectorAll(".fragment.visible");

        return Array.from(fragments).sort((a, b) => {
          const aIndex = parseInt(a.getAttribute("data-fragment-index"), 10);
          const bIndex = parseInt(b.getAttribute("data-fragment-index"), 10);
          return aIndex > bIndex;
        });
      }

      function onFragmentShown(e) {
        const fragments = e.fragments;
        const { initialFragments, currentFragments } =
          groupFragments(fragments);
        handleInitialFragments(initialFragments);
        handleCurrentFragments(currentFragments);
      }

      function groupFragments(fragments) {
        const initialFragments = [];
        const currentFragments = [];
        for (let fragment of fragments) {
          if (fragment.classList.contains("current-fragment")) {
            currentFragments.push(fragment);
          } else {
            initialFragments.push(fragment);
          }
        }
        return { initialFragments, currentFragments };
      }

      function handleInitialFragments(fragments) {
        for (let fragment of fragments) {
          handleCurrentFragment(fragment);
        }
      }

      function handleCurrentFragments(fragments) {
        for (let fragment of fragments) {
          handleCurrentFragment(fragment);
        }
      }

      function handleCurrentFragment(fragment) {
        const lines = parseLines(fragment.getAttribute("data-cue-code-lines"));
        if (lines) {
          const codeBlock = resolveCodeBlock(fragment);
          if (lines === "*") {
            performClearHighlight(codeBlock);
          } else {
            performHighlight(codeBlock, lines === "_" ? new Set() : lines);
          }
        }
      }

      function onFragmentHidden(e) {
        if (e.fragments.some((f) => f.getAttribute("data-cue-code-lines"))) {
          const actions = history.pop() || [];
          for (let action of actions) {
            action.undo(action.elem);
          }
        }
      }

      function parseLines(input) {
        if (input === "_" || input === "*") {
          return input;
        }
        return (
          input &&
          new Set(
            input.split(",").flatMap((x) => {
              if (x.includes("-")) {
                const limits = x.split("-").map((y) => parseInt(y, 10));
                return range(limits[0], limits[1]);
              }
              return [parseInt(x, 10)];
            })
          )
        );
      }

      function range(lower, upper) {
        const points = [];
        for (let i = lower; i <= upper; i++) {
          points.push(i);
        }
        return points;
      }

      function resolveCodeBlock(fragment) {
        const slide = reveal.getCurrentSlide();
        const id = fragment.getAttribute("data-cue-code-id");
        if (id) {
          return slide.querySelector(`pre code[data-cue-code-id="${id}"`);
        }
        return slide.querySelector("pre code");
      }

      function performHighlight(block, lineIds) {
        const actions = [];
        const lines = block.querySelectorAll("tr");
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (lineIds.has(i + 1)) {
            performHighlightLine(line, actions);
          } else {
            performDehighlightLine(line, actions);
          }
        }

        performHighlightBlock(block, actions);

        history.push(actions);
      }

      function performHighlightLine(line, actions) {
        if (!isHighlightedLine(line)) {
          highlightLine(line);
          actions.push({ elem: line, undo: dehighlightLine });
        }
      }

      function performHighlightBlock(block, actions) {
        if (!isHighlightedBlock(block)) {
          highlightBlock(block);
          actions.push({ elem: block, undo: dehighlightBlock });
        }
      }

      function performDehighlightLine(line, actions) {
        if (isHighlightedLine(line)) {
          dehighlightLine(line);
          actions.push({ elem: line, undo: highlightLine });
        }
      }

      function performDehighlightBlock(block, actions) {
        if (isHighlightedBlock(block)) {
          dehighlightBlock(block);
          actions.push({ elem: block, undo: highlightBlock });
        }
      }

      function performClearHighlight(block) {
        const actions = [];

        const lines = block.querySelectorAll("tr");
        for (let line of lines) {
          performDehighlightLine(line, actions);
        }
        performDehighlightBlock(block, actions);

        history.push(actions);
      }

      function highlightLine(line) {
        line.classList.add("highlight-line");
      }

      function highlightBlock(block) {
        block.classList.add("has-highlights");
      }

      function dehighlightBlock(codeBlock) {
        codeBlock.classList.remove("has-highlights");
      }

      function dehighlightLine(line) {
        line.classList.remove("highlight-line");
      }

      function isHighlightedBlock(block) {
        return block.classList.contains("has-highlights");
      }

      function isHighlightedLine(line) {
        return line.classList.contains("highlight-line");
      }
    },
  };
};
