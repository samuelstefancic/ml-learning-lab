# Contributing to ML Learning Lab

Thanks for helping make machine-learning concepts easier to learn by manipulation rather than memorization.

## Principles

- Explain before testing.
- Keep the formula and glossary visible until the learner has demonstrated understanding.
- Sliders must mirror the exact numeric value used by the model; always provide direct numeric input too.
- Accept decimal input with both `.` and `,` where the locale is French.
- Success explanations should be step-by-step, concise, and readable rather than compressed into one line.
- Quiz feedback must be semantic: green for correct, red for incorrect, plus a short explanation and a concept reminder.
- Add new lessons as data in `src/exercises.ts` whenever an existing mission type can express them. Add new UI mission types only when needed.

## Development

```bash
npm install
npm run check
npm run playground
```

Open `http://localhost:3000/playground`.

To export a standalone local HTML file:

```bash
npm run playground:export
```

Then open `dist/linear-regression-loss.html` directly in a browser.

## Pull requests

Keep PRs focused. Add or update tests for math/threshold logic. Describe the learning objective, not only the code change.
