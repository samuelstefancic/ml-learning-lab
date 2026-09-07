export type QuizOption = {
  value: string;
  label: string;
  feedback: string;
  reminder: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  concept: string;
  correct: string;
  options: QuizOption[];
};

export type LearningLab = {
  id: string;
  title: string;
  description: string;
  locale: string;
  glossary: Array<{ symbol: string; name: string; meaning: string }>;
  formulas: Array<{ name: string; expression: string; meaning: string }>;
  missions: Array<Record<string, unknown>>;
};

export const LINEAR_REGRESSION_LOSS_LAB: LearningLab = {
  id: "linear-regression-loss",
  title: "Linear Regression — Parameters & Loss",
  description:
    "Interactive practice for prediction, weight, bias, residuals, MAE, MSE, RMSE, and outlier sensitivity.",
  locale: "fr-FR",
  glossary: [
    { symbol: "x", name: "feature", meaning: "Valeur donnée au modèle." },
    { symbol: "y", name: "label réel", meaning: "Vraie valeur observée." },
    { symbol: "y'", name: "prédiction", meaning: "Valeur calculée par le modèle." },
    { symbol: "w", name: "weight", meaning: "Contrôle la pente de la droite." },
    { symbol: "b", name: "bias", meaning: "Décale la droite vers le haut ou le bas." }
  ],
  formulas: [
    { name: "Prédiction", expression: "y' = b + w × x", meaning: "Calcule la valeur prédite." },
    { name: "Erreur", expression: "erreur = y' − y", meaning: "Écart entre prédiction et réalité." },
    { name: "MAE", expression: "MAE = Σ|erreur| ÷ n", meaning: "Moyenne des erreurs absolues." },
    { name: "MSE", expression: "MSE = Σerreur² ÷ n", meaning: "Moyenne des erreurs au carré." },
    { name: "RMSE", expression: "RMSE = √MSE", meaning: "Racine de la MSE." }
  ],
  missions: [
    {
      id: "fit",
      kind: "linear_fit",
      title: "Mission 1 — Ajuste la droite",
      instruction: "Ajuste w et b pour atteindre une MSE ≤ 0,70.",
      dataset: [
        { x: 1, y: 4 },
        { x: 2, y: 7 },
        { x: 3, y: 10 },
        { x: 4, y: 16 }
      ],
      controls: {
        w: { label: "Weight w", min: -10, max: 10, step: 0.1, initial: 1 },
        b: { label: "Bias b", min: -10, max: 10, step: 0.1, initial: 0 }
      },
      objective: { metric: "mse", operator: "lte", value: 0.7 }
    },
    {
      id: "predict",
      kind: "prediction",
      title: "Mission 2 — Utilise ton modèle",
      instruction: "Avec le modèle validé à la mission 1, calcule y' pour x = 5.",
      x: 5,
      modelFromMission: "fit"
    },
    {
      id: "outlier",
      kind: "outlier_compare",
      title: "Mission 3 — MAE, MSE et outlier",
      instruction:
        "Trouve la plus petite valeur à un dixième de k telle que MAE préfère A mais MSE préfère B.",
      baseErrorsA: [1, 1, 1],
      errorsB: [3, 3, 3, 3],
      control: { label: "Erreur atypique k", min: 0.1, max: 20, step: 0.1, initial: 1 },
      precision: 0.1
    },
    {
      id: "quiz",
      kind: "quiz",
      title: "Questions après manipulation",
      questions: [
        {
          id: "q1",
          prompt: "Dans y' = b + wx, quelle valeur représente la réalité observée dans le dataset ?",
          concept: "Différence entre label réel y et prédiction y'",
          correct: "b",
          options: [
            {
              value: "a",
              label: "y'",
              feedback: "y' est la prédiction calculée par le modèle, pas la valeur réelle.",
              reminder: "Rappel : y' = prédiction ; y = label réel."
            },
            {
              value: "b",
              label: "y",
              feedback: "Exact : y est le label réel observé dans les données.",
              reminder: "Rappel : le modèle compare y' à y pour mesurer son erreur."
            },
            {
              value: "c",
              label: "b",
              feedback: "b est le bias, un paramètre du modèle.",
              reminder: "Rappel : b décale la droite ; il ne représente pas la réalité observée."
            }
          ]
        },
        {
          id: "q2",
          prompt: "Si tu modifies seulement b sans modifier w, que changes-tu principalement ?",
          concept: "Rôle du bias b par rapport au weight w",
          correct: "a",
          options: [
            {
              value: "a",
              label: "Toute la droite monte ou descend",
              feedback: "Exact : b est ajouté à toutes les prédictions, indépendamment de x.",
              reminder: "Rappel : b = bias/décalage ; w = pente."
            },
            {
              value: "b",
              label: "La pente de la droite",
              feedback: "La pente dépend principalement de w, pas de b.",
              reminder: "Rappel : augmenter w augmente l'effet de x sur y'."
            },
            {
              value: "c",
              label: "Les labels y",
              feedback: "Les labels y viennent du dataset et ne sont pas modifiés par le modèle.",
              reminder: "Rappel : le modèle ajuste ses paramètres, pas les vraies données."
            }
          ]
        },
        {
          id: "q3",
          prompt: "Pourquoi une grosse erreur influence-t-elle fortement la MSE ?",
          concept: "Mise au carré des erreurs et sensibilité aux outliers",
          correct: "c",
          options: [
            {
              value: "a",
              label: "La MSE double toutes les erreurs",
              feedback: "La MSE ne double pas les erreurs ; elle les met au carré.",
              reminder: "Rappel : 2² = 4, 6² = 36, 10² = 100."
            },
            {
              value: "b",
              label: "La MSE ajoute le bias à l'erreur",
              feedback: "Le bias intervient dans la prédiction, pas dans la définition de la MSE.",
              reminder: "Rappel : erreur = y' − y, puis MSE = moyenne des erreurs²."
            },
            {
              value: "c",
              label: "Chaque erreur est mise au carré",
              feedback: "Exact : le carré amplifie beaucoup les grosses erreurs.",
              reminder: "Rappel : c'est pourquoi la MSE est plus sensible aux outliers que la MAE."
            }
          ]
        }
      ] satisfies QuizQuestion[]
    }
  ]
};

export const LABS: Record<string, LearningLab> = {
  [LINEAR_REGRESSION_LOSS_LAB.id]: LINEAR_REGRESSION_LOSS_LAB
};
