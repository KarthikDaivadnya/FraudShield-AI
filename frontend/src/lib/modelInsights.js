// SHAP values: notebook cells 385/386 (shap.TreeExplainer on the fitted RF,
// mean |SHAP| for the fraud class over the validation set, n=1671).
// RF importance: notebook cell 238 (classifier.feature_importances_).
// Interpretations for the top 6: notebook cell 400 (markdown summary table).
//
// ROC/PR curve points: NOT copied from the notebook (those were rendered
// as matplotlib images, not printed arrays). Reproduced here by reloading
// fraudshield_final_rf_pipeline.joblib, rebuilding the identical stratified
// 70/15/15 split (random_state=42) from Fraud_Analysis_Dataset.csv, and
// running sklearn's roc_curve / precision_recall_curve against the same
// 1,672-row held-out test set the notebook used — confirmed to reproduce
// the same accuracy/precision/recall/F1/confusion matrix as
// fraudshield_model_metadata.joblib before being accepted. Curves are
// down-sampled to ~45 points each for chart weight; the underlying shape
// is real, not interpolated or invented.

export const SHAP_FEATURE_IMPORTANCE = [
  { feature: "origin_balance_fully_depleted", meanAbsShap: 0.141761 },
  { feature: "newbalanceOrig", meanAbsShap: 0.084479 },
  { feature: "abs_origin_balance_error", meanAbsShap: 0.078186 },
  { feature: "origin_balance_change", meanAbsShap: 0.068765 },
  { feature: "origin_balance_error", meanAbsShap: 0.068242 },
  { feature: "origin_balance_match", meanAbsShap: 0.055345 },
  { feature: "type_PAYMENT", meanAbsShap: 0.031301 },
  { feature: "destination_account_type_Merchant", meanAbsShap: 0.030265 },
  { feature: "oldbalanceDest", meanAbsShap: 0.016152 },
  { feature: "amount", meanAbsShap: 0.013694 },
  { feature: "type_CASH_OUT", meanAbsShap: 0.012323 },
  { feature: "oldbalanceOrg", meanAbsShap: 0.006361 },
  { feature: "type_TRANSFER", meanAbsShap: 0.005666 },
  { feature: "newbalanceDest", meanAbsShap: 0.003831 },
  { feature: "origin_balance_zero", meanAbsShap: 0.001109 },
  { feature: "type_DEBIT", meanAbsShap: 0.001054 },
];

// Notebook cell 400 — directional read of the top 6 SHAP features.
export const SHAP_INTERPRETATIONS = {
  origin_balance_fully_depleted: "A value of 1 strongly pushes the score toward fraud.",
  newbalanceOrig: "Strong influence, but nonlinear across its range.",
  abs_origin_balance_error: "Strong influence, nonlinear and banded.",
  origin_balance_change: "Larger positive changes generally push toward fraud.",
  origin_balance_error: "Nonlinear, context-dependent influence.",
  origin_balance_match: "A value of 1 (change exactly equals amount) pushes toward fraud.",
};

// Notebook cell 238 — RandomForestClassifier.feature_importances_, a
// second, independent view of feature relevance (Gini-based, whole-tree
// average) alongside the SHAP values above.
export const RF_FEATURE_IMPORTANCE = [
  { feature: "origin_balance_change", importance: 0.22055 },
  { feature: "origin_balance_fully_depleted", importance: 0.211945 },
  { feature: "abs_origin_balance_error", importance: 0.111973 },
  { feature: "newbalanceOrig", importance: 0.097219 },
  { feature: "origin_balance_error", importance: 0.094975 },
  { feature: "origin_balance_match", importance: 0.075713 },
  { feature: "type_PAYMENT", importance: 0.047131 },
  { feature: "destination_account_type_Merchant", importance: 0.04379 },
  { feature: "amount", importance: 0.031035 },
  { feature: "oldbalanceOrg", importance: 0.018104 },
  { feature: "oldbalanceDest", importance: 0.017003 },
  { feature: "type_CASH_OUT", importance: 0.008711 },
  { feature: "type_TRANSFER", importance: 0.008489 },
  { feature: "newbalanceDest", importance: 0.007933 },
  { feature: "origin_balance_zero", importance: 0.00311 },
  { feature: "type_DEBIT", importance: 0.00232 },
];

export const ROC_CURVE = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.0, tpr: 0.3663 },
  { fpr: 0.0, tpr: 0.5523 },
  { fpr: 0.0, tpr: 0.7093 },
  { fpr: 0.0, tpr: 0.7384 },
  { fpr: 0.0, tpr: 0.8023 },
  { fpr: 0.0, tpr: 0.8372 },
  { fpr: 0.0, tpr: 0.8895 },
  { fpr: 0.0, tpr: 0.9709 },
  { fpr: 0.054, tpr: 0.9942 },
  { fpr: 0.0633, tpr: 0.9942 },
  { fpr: 0.0753, tpr: 1.0 },
  { fpr: 0.0807, tpr: 1.0 },
  { fpr: 0.0907, tpr: 1.0 },
  { fpr: 0.096, tpr: 1.0 },
  { fpr: 0.1, tpr: 1.0 },
  { fpr: 0.104, tpr: 1.0 },
  { fpr: 0.1093, tpr: 1.0 },
  { fpr: 0.114, tpr: 1.0 },
  { fpr: 0.116, tpr: 1.0 },
  { fpr: 0.132, tpr: 1.0 },
  { fpr: 0.1347, tpr: 1.0 },
  { fpr: 0.1393, tpr: 1.0 },
  { fpr: 0.144, tpr: 1.0 },
  { fpr: 0.1473, tpr: 1.0 },
  { fpr: 0.1513, tpr: 1.0 },
  { fpr: 0.1587, tpr: 1.0 },
  { fpr: 0.162, tpr: 1.0 },
  { fpr: 0.1673, tpr: 1.0 },
  { fpr: 0.17, tpr: 1.0 },
  { fpr: 0.1733, tpr: 1.0 },
  { fpr: 0.1807, tpr: 1.0 },
  { fpr: 0.1873, tpr: 1.0 },
  { fpr: 0.1907, tpr: 1.0 },
  { fpr: 0.1953, tpr: 1.0 },
  { fpr: 0.2, tpr: 1.0 },
  { fpr: 0.2067, tpr: 1.0 },
  { fpr: 0.2087, tpr: 1.0 },
  { fpr: 0.2233, tpr: 1.0 },
  { fpr: 0.226, tpr: 1.0 },
  { fpr: 0.2307, tpr: 1.0 },
  { fpr: 0.2353, tpr: 1.0 },
  { fpr: 0.2407, tpr: 1.0 },
  { fpr: 0.246, tpr: 1.0 },
  { fpr: 1.0, tpr: 1.0 },
];

export const PR_CURVE = [
  { recall: 1.0, precision: 0.1029 },
  { recall: 1.0, precision: 0.3233 },
  { recall: 1.0, precision: 0.3295 },
  { recall: 1.0, precision: 0.334 },
  { recall: 1.0, precision: 0.3561 },
  { recall: 1.0, precision: 0.3699 },
  { recall: 1.0, precision: 0.3822 },
  { recall: 1.0, precision: 0.4019 },
  { recall: 1.0, precision: 0.4135 },
  { recall: 1.0, precision: 0.4226 },
  { recall: 1.0, precision: 0.4388 },
  { recall: 1.0, precision: 0.455 },
  { recall: 1.0, precision: 0.4661 },
  { recall: 1.0, precision: 0.5059 },
  { recall: 1.0, precision: 0.5181 },
  { recall: 1.0, precision: 0.5292 },
  { recall: 1.0, precision: 0.546 },
  { recall: 1.0, precision: 0.5621 },
  { recall: 1.0, precision: 0.5753 },
  { recall: 1.0, precision: 0.589 },
  { recall: 1.0, precision: 0.6056 },
  { recall: 1.0, precision: 0.6187 },
  { recall: 1.0, precision: 0.6347 },
  { recall: 0.9942, precision: 0.6477 },
  { recall: 0.9942, precision: 0.6628 },
  { recall: 0.9942, precision: 0.684 },
  { recall: 0.9942, precision: 0.7008 },
  { recall: 0.9942, precision: 0.7215 },
  { recall: 0.9942, precision: 0.7403 },
  { recall: 0.9942, precision: 0.7634 },
  { recall: 0.9942, precision: 0.7844 },
  { recall: 0.9942, precision: 0.8104 },
  { recall: 0.9942, precision: 0.8341 },
  { recall: 0.9942, precision: 0.8636 },
  { recall: 0.9942, precision: 0.8906 },
  { recall: 0.9942, precision: 0.9243 },
  { recall: 0.9942, precision: 0.9553 },
  { recall: 0.9942, precision: 0.9942 },
  { recall: 0.9593, precision: 1.0 },
  { recall: 0.9186, precision: 1.0 },
  { recall: 0.8779, precision: 1.0 },
  { recall: 0.8372, precision: 1.0 },
  { recall: 0.7733, precision: 1.0 },
  { recall: 0.7151, precision: 1.0 },
  { recall: 0.0, precision: 1.0 },
];

// Notebook cells 286–306 ("Level 8 — Threshold Optimization"). 0.21 is the
// F1-maximizing operating point on the validation set: 100% precision,
// 98.25% recall, 0 false positives. Lowering the threshold further does
// not recover the 3 remaining false negatives — the notebook confirmed no
// threshold below 0.21 detects any additional true positive, and
// documented those 3 cases (zero origin balance / atypical amount-to-
// balance ratio) as a known minority fraud pattern rather than tuning
// further and risking overfitting the validation set.
export const THRESHOLD_EXPLAINER = {
  threshold: 0.21,
  validationPrecision: 1.0,
  validationRecall: 0.9825,
  validationF1: 0.9912,
  note:
    "0.21 is the F1-maximizing threshold found by sweeping 0.10–0.90 against the validation set: it reaches 100% precision and 98.25% recall with zero false positives. Thresholds below 0.21 don't recover any of the 3 remaining false negatives, so the notebook documents those as a known minority fraud pattern (zero origin balance / atypical amount-to-balance ratio) rather than over-tuning to chase them.",
};
