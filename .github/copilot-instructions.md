# Copilot instructions for Algorithm Visual

This repository is a small frontend algorithm visualizer. The goal of these instructions is to help AI coding agents be productive immediately by describing architecture, integration points, conventions, and actionable examples taken directly from the code.

1. Big picture
- Single-page frontend app served via `index.html` (no build step). Main entry: `src/main.js` which wires UI -> algorithms -> visualization.
- Core components:
  - UI/Orchestration: `src/main.js` — reads controls, generates arrays, instantiates algorithms and `Visualizer`, and binds `AlgorithmRunner`.
  - Runner: `src/algorithms/AlgorithmRunner.js` — executes precomputed visualization steps and drives `Visualizer` and pseudocode highlighting.
  - Visualizer: `src/visualization/Visualizer.js` — DOM renderer; expects `render(array, highlights)` and uses CSS classes `comparing`, `swapping`, `sorted`, `current`.
  - Algorithms: `src/algorithms/**` (sorting/searching) — each algorithm exports a class with `generateSteps(array)` that returns an ordered array of step objects.
  - Helpers: `src/utils/pseudocode.js` (pseudocode lines), `src/utils/algorithmInfo.js` (metadata shown in UI).

2. Data-flow & integration points
- `App` (in `src/main.js`) instantiates an Algorithm class and the Visualizer, then creates `new AlgorithmRunner(algorithm, visualizer, array, pseudocodeCallback)`.
- `AlgorithmRunner.generateSteps()` calls `algorithm.generateSteps([...array])` once to produce `steps[]`.
- Each `step` is an object with at least one of these fields: `type`, `array` (optional, updated array snapshot), `indices` / `index`, `highlights`, `pseudocodeLine`.
- `AlgorithmRunner.executeStep()` maps `step.type` to Visualizer actions and calls `pseudocodeCallback(step.pseudocodeLine)` when present.

3. Step types (concrete examples)
- Observed `type` values in existing algorithms: `render`, `compare`, `swap`, `mark-sorted`, `current`.
- Example step from `BubbleSort.js`:

```json
{
  "type": "compare",
  "indices": ["j", "j+1"],
  "array": [...arr],
  "pseudocodeLine": 4
}
```

- Example final mark from `BinarySearch.js`:
```json
{
  "type": "render",
  "array": [...sortedArray],
  "highlights": { "sorted": [mid] },
  "pseudocodeLine": 5
}
```

4. Conventions and patterns to follow when editing/adding code
- Algorithms must export a class with `generateSteps(array)` that returns a chronological array of step objects (see above). The Runner expects a complete steps list — it does not introspect algorithm internals.
- Keep pseudocode alignment: `pseudocodeLine` indexes reference `src/utils/pseudocode.js` arrays. Keep those arrays in sync when adding lines.
- Visual highlights: prefer using `highlights` object or the `indices/index` fields. Visualizer will look for `comparing`, `swapping`, `sorted`, `current` within highlights.
- UI constraints enforced in `src/main.js`: manual arrays must be 5–50 elements; follow existing input validation.

5. Developer workflows (how to run & debug)
- No build step — open `index.html` in a browser. For local development use a static server for proper module loading:

```bash
# Quick: Python 3 built-in server
python -m http.server 8000
# or using npm http-server
npx http-server -c-1
```

- Debugging tips:
  - Use browser devtools. Breakpoints in `src/algorithms/*` and `src/algorithms/AlgorithmRunner.js` are high-leverage.
  - When adding a new algorithm, `console.log(step)` inside `generateSteps` to verify shapes before integration.

6. Files to open first when making changes
- `src/main.js` — wiring and UI conventions.
- `src/algorithms/AlgorithmRunner.js` — step execution and allowed `step.type` handling.
- `src/visualization/Visualizer.js` — DOM rendering expectations and CSS class names.
- `src/utils/pseudocode.js` — must match `pseudocodeLine` indices used by steps.

7. What not to assume
- There is no bundler/build; code is ES modules directly loaded by the browser. Avoid adding Node-only code unless you also add a build step.
- The Runner expects a precomputed step list; do not change it to stream arbitrary events without updating Runner logic.

8. If you add features
- If adding a new `step.type`, update `AlgorithmRunner.executeStep()` and provide Visualizer handling (and CSS if needed).
- If adding UI controls, add DOM elements in `index.html` and mirror event wiring in `src/main.js`.

If anything above is unclear or you want a different level of detail (examples for adding a new algorithm, or tests scaffolding), tell me which part to expand.
