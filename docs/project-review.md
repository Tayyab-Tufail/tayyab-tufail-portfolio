# Project review — Tayyab Tufail

Reviewed on 15 September 2026. The workspace contains 16 source packages representing 15 project entries; the fire/smoke research and GUI packages are editions of one project.

This review uses documentation, dependency files, representative source code, and saved output artifacts. Training jobs, full backend integrations, hardware acceptance, and the projects’ test suites were not rerun for the review. A few frontend interfaces were subsequently launched only to capture portfolio screenshots.

## 1. API Test Evidence Lab

**Area:** Web / Developer tools  
**Technology:** React, TypeScript, FastAPI, Claude

A developer workspace that turns OpenAPI and Swagger specifications into structured API test cases. The React interface connects to FastAPI to import contracts, select operations, generate tests with Claude, validate requests, and save execution evidence.

- OpenAPI / Swagger import in JSON and YAML
- AI-assisted test generation and request-contract validation
- Controlled Mockoon execution and downloadable JSON evidence

**Saved result or implementation outcome:** A connected workflow for specification import, test generation, execution, and report export.

**Scope and readiness:** Local developer tool. Execution verdicts currently compare HTTP status codes; external configuration is needed for Claude and Mockoon.

**Original package:** `api-test-evidence-lab-clean-repo`

## 2. MedBot

**Area:** AI / Robotics  
**Technology:** Python, DistilBERT, Webots, Whisper

MedBot translates typed or audio instructions into structured delivery tasks for a simulated e-puck robot. Intent classification, entity extraction, clarification, and validated symbolic plans connect the language pipeline to robot navigation.

- DistilBERT intent classification and entity extraction
- Dialogue gates and deterministic plan validation
- A* navigation, proximity avoidance, and mission evidence

**Saved result or implementation outcome:** Saved evaluations report 184/184 held-out intent predictions and six completed navigation missions without recorded collisions.

**Scope and readiness:** Webots simulation. The recorded audio mission uses a synthesized WAV; these results do not represent real hospital deployment.

**Original package:** `MedBot_Delivery_Complete_2026-08-15`

## 3. Asaan Mazdoor

**Area:** Mobile / Full-stack  
**Technology:** React Native, Expo, Express, MongoDB

A two-sided mobile marketplace with separate customer and professional experiences. The app connects profiles, services, job applications, orders, reviews, chat, and payment flows through an Express and MongoDB backend.

- Customer and professional profiles, services, and work photos
- Job posts, applications, orders, ratings, and messaging
- Stripe PaymentIntent and mobile payment-confirmation integration

**Saved result or implementation outcome:** A substantial mobile and backend implementation covering the service-booking lifecycle.

**Scope and readiness:** Development prototype. Local API configuration and realtime Socket.IO wiring need integration cleanup before a deployment.

**Original package:** `asaan mazdoor app (1)`

## 4. Fire & Smoke Detection

**Area:** AI / Computer vision  
**Technology:** YOLOv8, PyTorch, OpenCV, Gradio

A computer-vision workflow that audits data, compares YOLOv8n and YOLOv8s, selects a model on validation results, and evaluates held-out images. A Gradio application adds image and video inference, configurable thresholds, annotated downloads, and detection tables.

- Dataset auditing, grouped splits, and YOLO model comparison
- Image/video inference with confidence and size controls
- Annotated outputs, per-class results, and GPU/CPU selection

**Saved result or implementation outcome:** The saved YOLOv8s test evaluation reports mAP@0.50 of 0.773 and mAP@0.50:0.95 of 0.451.

**Scope and readiness:** One project represented by a research package and a GUI delivery edition. Results are limited to the evaluated datasets and conditions.

**Original packages:** `fire and smoke detection thesis delivery`, `fire_smoke_detection_gui_delivery`

## 5. Weapon Detection Console

**Area:** Web / Computer vision  
**Technology:** React, FastAPI, YOLOv8, Recharts

A React and FastAPI application for inspecting object-detection outputs and experiment results. The interface combines image and video inference with annotated media, latency summaries, dataset views, and model-evaluation charts.

- Image and video detection with labelled bounding boxes
- Interactive analytics, latency summaries, and model metrics
- FastAPI inference endpoints and a TypeScript frontend

**Saved result or implementation outcome:** Saved Granada-only test evaluation reports mAP@0.50 of 0.896, precision of 0.947, and recall of 0.871.

**Scope and readiness:** Local prototype evaluated on a specific dataset. Test-set threshold sweeps are exploratory and should not be treated as independent performance validation.

**Original package:** `weaponsDetection_client_deliverable (1)`

## 6. FinBias Sentiment Analyzer

**Area:** AI / Natural language  
**Technology:** FinBERT, Transformers, PyTorch, Taipy

A three-class sentiment-analysis workflow comparing FinBERT with a TF-IDF and logistic-regression baseline. The local Taipy interface predicts sentence sentiment, displays class probabilities, and keeps session history.

- Reproducible train/validation/test splits and model selection
- FinBERT classification with confidence probabilities
- Token attributions, evaluation charts, and CPU/CUDA inference

**Saved result or implementation outcome:** Saved test results: 92.66% accuracy and 0.9015 macro F1 across 518 held-out rows.

**Scope and readiness:** Classifies text sentiment. The outputs do not establish manipulation, financial bias, or investment performance.

**Original package:** `FinBias_Delivery`

## 7. Brain MRI Classification

**Area:** AI / Deep learning  
**Technology:** PyTorch, Python, CNN, Model evaluation

A modular research pipeline for data preparation, training, and image classification across glioma, meningioma, no-tumor, and pituitary classes. The study includes model comparisons, secondary-dataset evaluation, and repeated-seed experiments.

- Custom TumorDetNet architecture and baseline comparison
- Per-class metrics, confusion matrices, and saved checkpoints
- Secondary-dataset and three-seed evaluations

**Saved result or implementation outcome:** Saved test accuracy is 89.72% versus 83.33% for the baseline; secondary-dataset accuracy is 84.30%.

**Scope and readiness:** Image-classification research, not a clinical diagnostic system. Splits are image-level; patient-level independence is not established.

**Original package:** `brain tumor detection`

## 8. Grocery Item Recognition

**Area:** AI / Computer vision  
**Technology:** EfficientNet, PyTorch, Gradio, torchvision

An image-classification study comparing EfficientNet-B0, MobileNetV3-Small, and ResNet18. A Gradio interface loads the selected model and presents the top five predicted grocery categories with scores.

- 43 coarse grocery classes spanning produce and packaged goods
- Validation-based model selection across three architectures
- Image inference, top-five scores, and error-analysis outputs

**Saved result or implementation outcome:** Saved EfficientNet-B0 test results: 81.61% accuracy, 0.735 macro F1, and 94.12% top-three accuracy.

**Scope and readiness:** Research/demo application. Packaged example paths and pretrained-weight loading need cleanup for a fully offline setup.

**Original package:** `grocery_items_client_delivery`

## 9. Explainable Phishing Detection

**Area:** AI / Cybersecurity  
**Technology:** XGBoost, scikit-learn, SHAP, LIME

A research workflow comparing five classifiers on structured URL, domain, and webpage features. It examines possible data leakage, removes suspicious features, tunes a validation threshold, and explores model explanations and classification errors.

- Five-model comparison with preprocessing pipelines
- Suspicious-feature removal and domain-overlap auditing
- Validation threshold selection, SHAP/LIME, and error analysis

**Saved result or implementation outcome:** Saved reduced-feature XGBoost holdout: 99.58% accuracy, 1 false negative, and 18 false positives over 4,500 rows.

**Scope and readiness:** Single-dataset result with domain overlap and no external or temporal validation. It is a research study, not a deployed protection service.

**Original package:** `Phishing_detection_dissertation_final_delivery_2026-08-09`

## 10. Voice & Gesture Robot Control

**Area:** Robotics / Human interaction  
**Technology:** MediaPipe, Vosk, OpenCV, Webots

A multimodal e-puck navigation prototype using offline speech recognition and head-pose gestures. A controlled task state machine coordinates activation, destination selection, route confirmation, replanning, and stop commands, while a dashboard explains the current state.

- Vosk speech recognition and MediaPipe head-gesture detection
- Shortest and alternative routes with nod confirmation
- Voice/head-shake stop, destination changes, and live telemetry

**Saved result or implementation outcome:** The supplied audit records 69 Windows offline tests and 38 passing deterministic Docker scenarios.

**Scope and readiness:** Kinematic Webots simulation. Physical microphone and camera acceptance is separate from saved deterministic tests.

**Original package:** `Head_Gesture_Epuck_Submission_20260808_FINAL`

## 11. Vision-Based Autonomous E-puck

**Area:** Robotics / Computer vision  
**Technology:** OpenCV, Webots, Python, Sensor fusion

An autonomous navigation study combining lane perception, multi-object tracking, steering control, and an eight-sensor proximity layer. The controller follows lanes, stops for moving objects, avoids stationary obstacles, and records decisions and telemetry.

- Camera lane perception and multi-frame object tracking
- PID steering, avoidance, stopping, and lane rejoining
- Proximity fusion, repeatable scenarios, and recorded telemetry

**Saved result or implementation outcome:** Saved formal results report 150 completed vision trials and 30 multi-obstacle trials with no recorded collisions.

**Scope and readiness:** Controlled Webots scenarios. The displayed completed-lap image is from the retained proposal world; physical-robot performance and human evaluation are outside this evidence.

**Original package:** `Vision_Based_Autonomous_Epuck_Final_Submission (3)`

## 12. Transformer Toxicity Classification

**Area:** AI / Natural language  
**Technology:** BERT, DistilBERT, DeBERTa, PyTorch

An experimental workflow that assembles and cleans text data from Jigsaw and cyberbullying sources, develops a ten-category label scheme, and compares transformer models on source-specific and combined-data experiments.

- Dataset preparation and cleaning across multiple sources
- DistilBERT, BERT, and DeBERTa experiments
- Class-distribution analysis and logged validation comparisons

**Saved result or implementation outcome:** The cleaned dataset contains 9,996 records. Observed validation macro F1 is approximately 0.60–0.62.

**Scope and readiness:** Research notebooks. An independent test evaluation and packaged inference model are not established; only actual output charts are shown.

**Original package:** `toxic_behaviour_classify`

## 13. Water Potability Prediction

**Area:** AI / Data science  
**Technology:** scikit-learn, Random Forest, pandas, Python

A water-potability modelling workflow covering dataset audits, missing-value imputation, scaling, model comparison, and validation-based threshold tuning. The final delivery includes fitted model artifacts and saved prediction results.

- Reusable preprocessing and classification pipelines
- Logistic regression, random forest, Extra Trees, and boosting comparisons
- Validation-based selection, threshold tuning, and saved artifacts

**Saved result or implementation outcome:** Saved random-forest test results: 68.50% accuracy, 0.4444 F1, and 0.6842 ROC-AUC at threshold 0.46.

**Scope and readiness:** A methodology-focused study with limited predictive performance. These predictions cannot establish that water is safe to drink.

**Original package:** `water_quality_study_bundle (1)`

## 14. Food Ordering App

**Area:** Mobile / UI development  
**Technology:** React Native, Expo, Redux, JavaScript

A mobile interface prototype exploring the food-ordering journey from a welcome screen to menu search, cart quantities, totals, location lookup, and checkout confirmation.

- Menu browsing and search with product imagery
- Redux cart state, quantities, and total calculations
- Account screens, location lookup, and confirmation UI

**Saved result or implementation outcome:** A working collection of mobile screens and local state-management flows.

**Scope and readiness:** UI prototype with local account storage. Checkout displays a confirmation; there is no connected ordering or payment backend.

**Original package:** `Food`

## 15. CyberShield Social App

**Area:** Mobile / UI development  
**Technology:** React Native, Expo, Navigation, AsyncStorage

A React Native and Expo prototype featuring feed, post, comment, friend, profile, notification, and chat interfaces. Shared local state supports the social interaction screens and device storage supports the account prototype.

- Feed, posts, comments, reactions, and image selection
- Profiles, friends, notifications, and chat screens
- React Navigation and shared local application state

**Saved result or implementation outcome:** A broad mobile UI prototype demonstrating social-app navigation and component composition.

**Scope and readiness:** Local-state prototype. Despite the original folder name, this is a social application rather than a cybersecurity detection tool or live messaging service.

**Original package:** `CyberSecurity`

## Portfolio structure

The website features all 15 projects, supported by project descriptions and original outputs. Screenshots, dataset visualizations, evaluation charts, and promotional artwork are labelled according to their source. The CyberSecurity folder is presented as a social-app prototype. Unsupported placeholder scores in the toxicity visualization notebook are excluded.

The strongest overall positioning is software development across apps, web, AI/ML, and robotics. First-person skill descriptions follow Tayyab’s stated capabilities. Employment, qualifications, years of experience, and client outcomes have not been invented.

