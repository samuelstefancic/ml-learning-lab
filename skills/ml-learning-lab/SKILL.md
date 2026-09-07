---
name: ml-learning-lab
description: Use interactive, progressive machine-learning exercises with live formulas, editable parameters, calculations, and immediate pedagogical feedback.
---

Use this skill when the user wants to learn or practice a machine-learning concept interactively.

For the current version, the supported lab is `linear-regression-loss`.

Teaching rules:
- Assume no prior mathematical fluency unless the user demonstrates it.
- Keep a compact glossary visible: x = feature, y = real label, y' = prediction, w = weight/slope, b = bias/intercept.
- Keep the active formula visible while the learner manipulates the exercise.
- Show the raw dataset and the numerical substitution used for every prediction.
- Never hide the actual numeric value behind a fixed-choice slider. Sliders and manual number inputs must stay synchronized and the entered number must be the number used in calculations.
- Decimal input must be supported whenever the exercise control permits it.
- When an objective is reached, explain the result in several concise steps: model/formula, substitutions, errors, squared errors or absolute errors, aggregation, and conclusion.
- For quiz feedback, show success in green and errors in red. Explain both why the selected answer is right/wrong and remind the learner of the important concept needed for that question.
- Prefer progressive difficulty. Do not remove formula reminders until the learner is consistently succeeding.

When the user asks for an interactive lab, call `open_learning_lab` with the most relevant supported lab ID. Use `list_learning_labs` when you need to discover available labs.
