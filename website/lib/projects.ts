export type ProjectImage = {file:string;caption:string};
export type Project = {id:string;githubUrl?:string;title:string;category:string;tags:string[];description:string;summary:string;features:string[];result:string;context:string;images:ProjectImage[];sourceFolders:string[]};
import expandedGalleries from './project-galleries.json';
const projectCatalog: Project[] = [
  {
    "id": "api-test-lab",
    "githubUrl": "https://github.com/Tayyab-Tufail/api-test-evidence-lab",
    "title": "API Test Evidence Lab",
    "category": "Web / Developer tools",
    "tags": [
      "React",
      "TypeScript",
      "FastAPI",
      "Claude"
    ],
    "description": "From an OpenAPI specification to AI-assisted tests and traceable execution reports.",
    "summary": "A developer workspace that turns OpenAPI and Swagger specifications into structured API test cases. The React interface connects to FastAPI to import contracts, select operations, generate tests with Claude, validate requests, and save execution evidence.",
    "features": [
      "OpenAPI / Swagger import in JSON and YAML",
      "AI-assisted test generation and request-contract validation",
      "Controlled Mockoon execution and downloadable JSON evidence"
    ],
    "result": "A connected workflow for specification import, test generation, execution, and report export.",
    "context": "Local developer tool. Execution verdicts currently compare HTTP status codes; external configuration is needed for Claude and Mockoon.",
    "images": [
      {
        "file": "api-test-lab-workspace.png",
        "caption": "API Test Evidence Lab interface, captured from the local application."
      }
    ],
    "sourceFolders": [
      "api-test-evidence-lab-clean-repo"
    ]
  },
  {
    "id": "rideflow",
    "githubUrl": "https://github.com/Tayyab-Tufail/rideflow-ride-hailing-app",
    "title": "RideFlow Ride-Hailing Platform",
    "category": "Mobile / Full-Stack",
    "tags": [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Google Maps API",
      "Stripe API",
      "Redux Toolkit"
    ],
    "description": "Full-stack mobile ride-hailing application with passenger booking, driver dispatch, in-app chat, and admin fleet telemetry.",
    "summary": "RideFlow is a full-stack ride-hailing platform inspired by Uber, Yango, and InDrive. Built with React Native, Node.js microservices, Socket.IO real-time dispatch, and MongoDB Atlas. Includes 3 dedicated portals: Passenger booking with live GPS tracking, Driver partner dispatch radar with wallet cashouts, and Admin fleet telemetry command center.",
    "features": [
      "Interactive passenger map pickup/dropoff booking & fare bidding",
      "Real-time Socket.IO driver-passenger chat & turn-by-turn route GPS",
      "Stripe payment gateway, driver wallet earnings & admin fleet analytics"
    ],
    "result": "Sub-50ms Socket.IO dispatch matching, 99.8% real-time GPS telemetry accuracy, and end-to-end multi-role mobile workflow.",
    "context": "Full-stack mobile platform with React Native UI and Node.js microservices backend.",
    "images": [
      {
        "file": "rideflow-ui-01.png",
        "caption": "Passenger Splash & Role Selection: App onboarding, multi-role switch (Passenger, Driver, Fleet Admin), and biometric login."
      }
    ],
    "sourceFolders": [
      "rideflow-ride-hailing-app"
    ]
  },
  {
    "id": "nexamart",
    "githubUrl": "https://github.com/Tayyab-Tufail/nexamart-mern-ecommerce-engine",
    "title": "NexaMart MERN E-Commerce Engine",
    "category": "Full-Stack / MERN Stack",
    "tags": [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Redux Toolkit",
      "Stripe API",
      "Redis",
      "Docker"
    ],
    "description": "Enterprise-grade MERN Stack e-commerce platform with Redis caching, Stripe checkout, and real-time sales telemetry.",
    "summary": "NexaMart is a full-stack e-commerce web application engineered on the MERN stack (MongoDB Atlas, Express.js, React 19, Node.js). Features high-throughput RESTful microservices, JWT authentication, Redux Toolkit state flow, Stripe Elements payment gateway, multi-criteria catalog search, inventory control, and real-time revenue analytics.",
    "features": [
      "MongoDB time-series sales tracking & sub-50ms Redis cache layer",
      "Stripe Elements 256-bit SSL encrypted checkout & webhook listeners",
      "Redux Toolkit state engine for real-time cart & inventory synchronization"
    ],
    "result": "Benchmarked 99.4% Redis cache hit rate, sub-50ms API response latency, and seamless end-to-end checkout pipeline.",
    "context": "Full-stack MERN platform deployed with Docker containerization and cloud MongoDB Atlas infrastructure.",
    "images": [
      {
        "file": "nexamart-ui-01.png",
        "caption": "Storefront Hero: Spring Tech Summit banner, deal countdown timer, and trending hardware catalog."
      }
    ],
    "sourceFolders": [
      "nexamart-mern-ecommerce-engine"
    ]
  },
  {
    "id": "medbot",
    "githubUrl": "https://github.com/Tayyab-Tufail/medbot-robotics-ai",
    "title": "MedBot",
    "category": "AI / Robotics",
    "tags": [
      "Python",
      "DistilBERT",
      "Webots",
      "Whisper"
    ],
    "description": "Natural-language understanding meets autonomous hospital delivery in simulation.",
    "summary": "MedBot translates typed or audio instructions into structured delivery tasks for a simulated e-puck robot. Intent classification, entity extraction, clarification, and validated symbolic plans connect the language pipeline to robot navigation.",
    "features": [
      "DistilBERT intent classification and entity extraction",
      "Dialogue gates and deterministic plan validation",
      "A* navigation, proximity avoidance, and mission evidence"
    ],
    "result": "Saved evaluations report 184/184 held-out intent predictions and six completed navigation missions without recorded collisions.",
    "context": "Webots simulation. The recorded audio mission uses a synthesized WAV; these results do not represent real hospital deployment.",
    "images": [
      {
        "file": "medbot-hospital-overview.png",
        "caption": "The simulated hospital: pharmacy, patient rooms, reception, and charging base."
      },
      {
        "file": "medbot-multitask-preview.png",
        "caption": "A frame from the recorded multi-task Webots demonstration."
      },
      {
        "file": "medbot-navigation-verification.png",
        "caption": "The project’s navigation and verification workflow."
      }
    ],
    "sourceFolders": [
      "MedBot_Delivery_Complete_2026-08-15"
    ]
  },
  {
    "id": "asaan-mazdoor",
    "githubUrl": "https://github.com/Tayyab-Tufail/asaan-mazdoor-service-marketplace",
    "title": "Asaan Mazdoor",
    "category": "Mobile / Full-stack",
    "tags": [
      "React Native",
      "Expo",
      "Express",
      "MongoDB"
    ],
    "description": "A service marketplace connecting customers with professionals and everyday work.",
    "summary": "A two-sided mobile marketplace with separate customer and professional experiences. The app connects profiles, services, job applications, orders, reviews, chat, and payment flows through an Express and MongoDB backend.",
    "features": [
      "Customer and professional profiles, services, and work photos",
      "Job posts, applications, orders, ratings, and messaging",
      "Stripe PaymentIntent and mobile payment-confirmation integration"
    ],
    "result": "A substantial mobile and backend implementation covering the service-booking lifecycle.",
    "context": "Development prototype. Local API configuration and realtime Socket.IO wiring need integration cleanup before a deployment.",
    "images": [
      {
        "file": "asaan-mazdoor-original-presentation.png",
        "caption": "Original project presentation featuring the Asaan Mazdoor welcome screen."
      }
    ],
    "sourceFolders": [
      "asaan mazdoor app (1)"
    ]
  },
  {
    "id": "fire-smoke",
    "githubUrl": "https://github.com/Tayyab-Tufail/fire-smoke-detection",
    "title": "Fire & Smoke Detection",
    "category": "AI / Computer vision",
    "tags": [
      "YOLOv8",
      "PyTorch",
      "OpenCV",
      "Gradio"
    ],
    "description": "Image and video detection with a usable interface and a comparative model study.",
    "summary": "A computer-vision workflow that audits data, compares YOLOv8n and YOLOv8s, selects a model on validation results, and evaluates held-out images. A Gradio application adds image and video inference, configurable thresholds, annotated downloads, and detection tables.",
    "features": [
      "Dataset auditing, grouped splits, and YOLO model comparison",
      "Image/video inference with confidence and size controls",
      "Annotated outputs, per-class results, and GPU/CPU selection"
    ],
    "result": "The saved YOLOv8s test evaluation reports mAP@0.50 of 0.773 and mAP@0.50:0.95 of 0.451.",
    "context": "One project represented by a research package and a GUI delivery edition. Results are limited to the evaluated datasets and conditions.",
    "images": [
      {
        "file": "fire-smoke-inference-output.jpg",
        "caption": "Annotated smoke prediction saved by the Gradio inference application."
      },
      {
        "file": "fire-smoke-test-predictions.jpg",
        "caption": "YOLOv8s predictions from a held-out test image batch."
      },
      {
        "file": "fire-smoke-class-performance.png",
        "caption": "Saved test precision, recall, and F1 for fire and smoke."
      }
    ],
    "sourceFolders": [
      "fire and smoke detection thesis delivery",
      "fire_smoke_detection_gui_delivery"
    ]
  },
  {
    "id": "weapon-detection",
    "githubUrl": "https://github.com/Tayyab-Tufail/weapon-detection-console",
    "title": "Weapon Detection Console",
    "category": "Web / Computer vision",
    "tags": [
      "React",
      "FastAPI",
      "YOLOv8",
      "Recharts"
    ],
    "description": "A detection and analytics interface for pistol and knife image/video analysis.",
    "summary": "A React and FastAPI application for inspecting object-detection outputs and experiment results. The interface combines image and video inference with annotated media, latency summaries, dataset views, and model-evaluation charts.",
    "features": [
      "Image and video detection with labelled bounding boxes",
      "Interactive analytics, latency summaries, and model metrics",
      "FastAPI inference endpoints and a TypeScript frontend"
    ],
    "result": "Saved Granada-only test evaluation reports mAP@0.50 of 0.896, precision of 0.947, and recall of 0.871.",
    "context": "Local prototype evaluated on a specific dataset. Test-set threshold sweeps are exploratory and should not be treated as independent performance validation.",
    "images": [
      {
        "file": "weapon-detection-predictions.jpg",
        "caption": "Saved validation predictions with pistol and knife labels and confidence scores."
      },
      {
        "file": "weapon-detection-knife-predictions.jpg",
        "caption": "Knife detections from a saved Granada validation batch."
      },
      {
        "file": "weapon-detection-confusion-matrix.png",
        "caption": "Normalized confusion matrix from the saved YOLOv8n training run."
      }
    ],
    "sourceFolders": [
      "weaponsDetection_client_deliverable (1)"
    ]
  },
  {
    "id": "finbias",
    "githubUrl": "https://github.com/Tayyab-Tufail/finbias-sentiment-analysis",
    "title": "FinBias Sentiment Analyzer",
    "category": "AI / Natural language",
    "tags": [
      "FinBERT",
      "Transformers",
      "PyTorch",
      "Taipy"
    ],
    "description": "Financial sentiment classification with a local interface and explainable model results.",
    "summary": "A three-class sentiment-analysis workflow comparing FinBERT with a TF-IDF and logistic-regression baseline. The local Taipy interface predicts sentence sentiment, displays class probabilities, and keeps session history.",
    "features": [
      "Reproducible train/validation/test splits and model selection",
      "FinBERT classification with confidence probabilities",
      "Token attributions, evaluation charts, and CPU/CUDA inference"
    ],
    "result": "Saved test results: 92.66% accuracy and 0.9015 macro F1 across 518 held-out rows.",
    "context": "Classifies text sentiment. The outputs do not establish manipulation, financial bias, or investment performance.",
    "images": [
      {
        "file": "finbias-test-confusion-matrix.png",
        "caption": "FinBERT held-out sentiment classification results."
      },
      {
        "file": "finbias-training-history.png",
        "caption": "Training and validation loss over three epochs."
      }
    ],
    "sourceFolders": [
      "FinBias_Delivery"
    ]
  },
  {
    "id": "brain-mri",
    "githubUrl": "https://github.com/Tayyab-Tufail/brain-mri-tumor-detection",
    "title": "Brain MRI Classification",
    "category": "AI / Deep learning",
    "tags": [
      "PyTorch",
      "Python",
      "CNN",
      "Model evaluation"
    ],
    "description": "A four-class MRI study comparing a custom TumorDetNet model with a baseline CNN.",
    "summary": "A modular research pipeline for data preparation, training, and image classification across glioma, meningioma, no-tumor, and pituitary classes. The study includes model comparisons, secondary-dataset evaluation, and repeated-seed experiments.",
    "features": [
      "Custom TumorDetNet architecture and baseline comparison",
      "Per-class metrics, confusion matrices, and saved checkpoints",
      "Secondary-dataset and three-seed evaluations"
    ],
    "result": "Saved test accuracy is 89.72% versus 83.33% for the baseline; secondary-dataset accuracy is 84.30%.",
    "context": "Image-classification research, not a clinical diagnostic system. Splits are image-level; patient-level independence is not established.",
    "images": [
      {
        "file": "brain-mri-dataset-samples.png",
        "caption": "MRI dataset samples across the four classification categories."
      },
      {
        "file": "brain-mri-confusion-matrix.png",
        "caption": "TumorDetNet test confusion matrix."
      },
      {
        "file": "brain-mri-model-comparison.png",
        "caption": "Saved test-accuracy comparison between the baseline CNN and TumorDetNet."
      }
    ],
    "sourceFolders": [
      "brain tumor detection"
    ]
  },
  {
    "id": "grocery",
    "githubUrl": "https://github.com/Tayyab-Tufail/grocery-classification",
    "title": "Grocery Item Recognition",
    "category": "AI / Computer vision",
    "tags": [
      "EfficientNet",
      "PyTorch",
      "Gradio",
      "torchvision"
    ],
    "description": "Recognizing 43 grocery categories with model comparisons and top-five predictions.",
    "summary": "An image-classification study comparing EfficientNet-B0, MobileNetV3-Small, and ResNet18. A Gradio interface loads the selected model and presents the top five predicted grocery categories with scores.",
    "features": [
      "43 coarse grocery classes spanning produce and packaged goods",
      "Validation-based model selection across three architectures",
      "Image inference, top-five scores, and error-analysis outputs"
    ],
    "result": "Saved EfficientNet-B0 test results: 81.61% accuracy, 0.735 macro F1, and 94.12% top-three accuracy.",
    "context": "Research/demo application. Packaged example paths and pretrained-weight loading need cleanup for a fully offline setup.",
    "images": [
      {
        "file": "grocery-dataset-samples.png",
        "caption": "Sample produce and packaged-product images from the grocery dataset."
      },
      {
        "file": "grocery-training-results.png",
        "caption": "EfficientNet-B0 training loss and validation macro F1."
      },
      {
        "file": "grocery-prediction-error-analysis.png",
        "caption": "Error analysis: misclassified examples, with true (T) and predicted (P) labels."
      }
    ],
    "sourceFolders": [
      "grocery_items_client_delivery"
    ]
  },
  {
    "id": "phishing",
    "githubUrl": "https://github.com/Tayyab-Tufail/phishing-detection",
    "title": "Explainable Phishing Detection",
    "category": "AI / Cybersecurity",
    "tags": [
      "XGBoost",
      "scikit-learn",
      "SHAP",
      "LIME"
    ],
    "description": "A feature-based phishing study with explainability and careful holdout evaluation.",
    "summary": "A research workflow comparing five classifiers on structured URL, domain, and webpage features. It examines possible data leakage, removes suspicious features, tunes a validation threshold, and explores model explanations and classification errors.",
    "features": [
      "Five-model comparison with preprocessing pipelines",
      "Suspicious-feature removal and domain-overlap auditing",
      "Validation threshold selection, SHAP/LIME, and error analysis"
    ],
    "result": "Saved reduced-feature XGBoost holdout: 99.58% accuracy, 1 false negative, and 18 false positives over 4,500 rows.",
    "context": "Single-dataset result with domain overlap and no external or temporal validation. It is a research study, not a deployed protection service.",
    "images": [
      {
        "file": "phishing-final-holdout.png",
        "caption": "Final reduced-feature XGBoost holdout confusion matrix."
      },
      {
        "file": "phishing-shap-analysis.png",
        "caption": "SHAP analysis of the full-feature Random Forest benchmark."
      }
    ],
    "sourceFolders": [
      "Phishing_detection_dissertation_final_delivery_2026-08-09"
    ]
  },
  {
    "id": "gesture-robot",
    "githubUrl": "https://github.com/Tayyab-Tufail/gesture-controlled-robot",
    "title": "Voice & Gesture Robot Control",
    "category": "Robotics / Human interaction",
    "tags": [
      "MediaPipe",
      "Vosk",
      "OpenCV",
      "Webots"
    ],
    "description": "Local voice commands and head gestures for confirmed waypoint navigation.",
    "summary": "A multimodal e-puck navigation prototype using offline speech recognition and head-pose gestures. A controlled task state machine coordinates activation, destination selection, route confirmation, replanning, and stop commands, while a dashboard explains the current state.",
    "features": [
      "Vosk speech recognition and MediaPipe head-gesture detection",
      "Shortest and alternative routes with nod confirmation",
      "Voice/head-shake stop, destination changes, and live telemetry"
    ],
    "result": "The supplied audit records 69 Windows offline tests and 38 passing deterministic Docker scenarios.",
    "context": "Kinematic Webots simulation. Physical microphone and camera acceptance is separate from saved deterministic tests.",
    "images": [
      {
        "file": "gesture-robot-navigation.jpg",
        "caption": "Recorded e-puck waypoint-navigation simulation."
      },
      {
        "file": "gesture-robot-voice-stop.jpg",
        "caption": "Saved simulation evidence of the voice-stop scenario."
      }
    ],
    "sourceFolders": [
      "Head_Gesture_Epuck_Submission_20260808_FINAL"
    ]
  },
  {
    "id": "autonomous-robot",
    "githubUrl": "https://github.com/Tayyab-Tufail/autonomous-lane-following-robot",
    "title": "Vision-Based Autonomous E-puck",
    "category": "Robotics / Computer vision",
    "tags": [
      "OpenCV",
      "Webots",
      "Python",
      "Sensor fusion"
    ],
    "description": "Camera-based lane following with obstacle tracking and local proximity-sensor safety.",
    "summary": "An autonomous navigation study combining lane perception, multi-object tracking, steering control, and an eight-sensor proximity layer. The controller follows lanes, stops for moving objects, avoids stationary obstacles, and records decisions and telemetry.",
    "features": [
      "Camera lane perception and multi-frame object tracking",
      "PID steering, avoidance, stopping, and lane rejoining",
      "Proximity fusion, repeatable scenarios, and recorded telemetry"
    ],
    "result": "Saved formal results report 150 completed vision trials and 30 multi-obstacle trials with no recorded collisions.",
    "context": "Controlled Webots scenarios. The displayed completed-lap image is from the retained proposal world; physical-robot performance and human evaluation are outside this evidence.",
    "images": [
      {
        "file": "autonomous-robot-navigation.jpg",
        "caption": "Completed-lap evidence from the retained proposal validation world."
      },
      {
        "file": "autonomous-robot-results.png",
        "caption": "Saved formal experiment results dashboard."
      }
    ],
    "sourceFolders": [
      "Vision_Based_Autonomous_Epuck_Final_Submission (3)"
    ]
  },
  {
    "id": "toxicity",
    "githubUrl": "https://github.com/Tayyab-Tufail/multilingual-toxicity-analysis",
    "title": "Transformer Toxicity Classification",
    "category": "AI / Natural language",
    "tags": [
      "BERT",
      "DistilBERT",
      "DeBERTa",
      "PyTorch"
    ],
    "description": "A ten-category text-classification study spanning dataset preparation and transformer comparison.",
    "summary": "An experimental workflow that assembles and cleans text data from Jigsaw and cyberbullying sources, develops a ten-category label scheme, and compares transformer models on source-specific and combined-data experiments.",
    "features": [
      "Dataset preparation and cleaning across multiple sources",
      "DistilBERT, BERT, and DeBERTa experiments",
      "Class-distribution analysis and logged validation comparisons"
    ],
    "result": "The cleaned dataset contains 9,996 records. Observed validation macro F1 is approximately 0.60: 0.62.",
    "context": "Research notebooks. An independent test evaluation and packaged inference model are not established; only actual output charts are shown.",
    "images": [
      {
        "file": "toxicity-dataset-categories.png",
        "caption": "Distribution of the ten dataset categories."
      },
      {
        "file": "toxicity-validation-comparison.png",
        "caption": "Actual logged validation comparison across the three transformers."
      }
    ],
    "sourceFolders": [
      "toxic_behaviour_classify"
    ]
  },
  {
    "id": "water-potability",
    "githubUrl": "https://github.com/Tayyab-Tufail/water-potability-classifier",
    "title": "Water Potability Prediction",
    "category": "AI / Data science",
    "tags": [
      "scikit-learn",
      "Random Forest",
      "pandas",
      "Python"
    ],
    "description": "A comparative tabular-ML study with reusable pipelines and transparent model evaluation.",
    "summary": "A water-potability modelling workflow covering dataset audits, missing-value imputation, scaling, model comparison, and validation-based threshold tuning. The final delivery includes fitted model artifacts and saved prediction results.",
    "features": [
      "Reusable preprocessing and classification pipelines",
      "Logistic regression, random forest, Extra Trees, and boosting comparisons",
      "Validation-based selection, threshold tuning, and saved artifacts"
    ],
    "result": "Saved random-forest test results: 68.50% accuracy, 0.4444 F1, and 0.6842 ROC-AUC at threshold 0.46.",
    "context": "A methodology-focused study with limited predictive performance. These predictions cannot establish that water is safe to drink.",
    "images": [
      {
        "file": "water-potability-test-results.png",
        "caption": "Random forest test results at the selected threshold of 0.46."
      },
      {
        "file": "water-potability-feature-importance.png",
        "caption": "Feature importance for the selected model."
      }
    ],
    "sourceFolders": [
      "water_quality_study_bundle (1)"
    ]
  },
  {
    "id": "food-app",
    "githubUrl": "https://github.com/Tayyab-Tufail/food-hunt-mobile-app",
    "title": "Food Ordering App",
    "category": "Mobile / UI development",
    "tags": [
      "React Native",
      "Expo",
      "Redux",
      "JavaScript"
    ],
    "description": "A mobile ordering experience with menu browsing, search, and cart management.",
    "summary": "A mobile interface prototype exploring the food-ordering journey from a welcome screen to menu search, cart quantities, totals, location lookup, and checkout confirmation.",
    "features": [
      "Menu browsing and search with product imagery",
      "Redux cart state, quantities, and total calculations",
      "Account screens, location lookup, and confirmation UI"
    ],
    "result": "A working collection of mobile screens and local state-management flows.",
    "context": "UI prototype with local account storage. Checkout displays a confirmation; there is no connected ordering or payment backend.",
    "images": [
      {
        "file": "food-app-welcome.png",
        "caption": "The original Food Hunt welcome screen, captured from the app’s local web preview."
      }
    ],
    "sourceFolders": [
      "Food"
    ]
  },
  {
    "id": "cybershield",
    "githubUrl": "https://github.com/Tayyab-Tufail/cybershield-mobile-app",
    "title": "CyberShield Social App",
    "category": "Mobile / UI development",
    "tags": [
      "React Native",
      "Expo",
      "Navigation",
      "AsyncStorage"
    ],
    "description": "A social app interface bringing feeds, profiles, reactions, and messaging screens together.",
    "summary": "A React Native and Expo prototype featuring feed, post, comment, friend, profile, notification, and chat interfaces. Shared local state supports the social interaction screens and device storage supports the account prototype.",
    "features": [
      "Feed, posts, comments, reactions, and image selection",
      "Profiles, friends, notifications, and chat screens",
      "React Navigation and shared local application state"
    ],
    "result": "A broad mobile UI prototype demonstrating social-app navigation and component composition.",
    "context": "Local-state prototype. Despite the original folder name, this is a social application rather than a cybersecurity detection tool or live messaging service.",
    "images": [
      {
        "file": "cybershield-login.png",
        "caption": "The original CyberShield login interface, rendered in an isolated web preview."
      }
    ],
    "sourceFolders": [
      "CyberSecurity"
    ]
  },
  {
    "id": "cogniflow",
    "githubUrl": "https://github.com/Tayyab-Tufail/cogniflow",
    "title": "CogniFlow AI",
    "category": "Web / AI Workflow Automation",
    "tags": [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "FastAPI"
    ],
    "description": "Visual drag-and-drop AI agent workflow builder with beautiful glassmorphism design.",
    "summary": "CogniFlow is an enterprise-grade AI workflow automation platform that connects intelligent AI agents, custom pipelines, and real-time data processing. It features a completely visual Node-based builder, allowing users to drag and drop LLMs, logic nodes, and API connectors without writing code.",
    "features": [
      "Interactive Node Graph Builder (Drag & Drop AI Nodes)",
      "Prompt Engineering Sandbox with LLM Output Simulator",
      "Integrations Hub for API Keys & Webhook Management",
      "Stunning Dark Glassmorphism Design with Neon Accents"
    ],
    "result": "A complete UI/UX engineered frontend that perfectly simulates a highly complex, multi-agent AI automation software with robust state management.",
    "context": "Frontend Architecture Prototype. Showcases advanced modern web design, state management (Zustand), and React 19 capabilities. Uses mocked data for executions.",
    "images": [
      {
        "file": "cogniflow-landing.png",
        "caption": "The main landing page with glowing neon UI and futuristic web design."
      },
      {
        "file": "cogniflow-builder.png",
        "caption": "The visual workflow canvas where users can drag and connect AI tasks."
      },
      {
        "file": "cogniflow-sandbox.png",
        "caption": "Prompt Sandbox to test and simulate LLM responses before deployment."
      },
      {
        "file": "cogniflow-node-library.png",
        "caption": "Expanding the Node Library in the builder to select new AI and logic blocks."
      },
      {
        "file": "cogniflow-api-modal.png",
        "caption": "Secure modal interface in the Integrations Hub for adding new API Keys."
      },
      {
        "file": "cogniflow-pipeline.png",
        "caption": "Live real-time status of an AI pipeline running its data flow."
      },
      {
        "file": "cogniflow-sandbox-output.png",
        "caption": "Detailed results and simulation logs displayed after running the Sandbox."
      }
    ],
    "sourceFolders": [
      "cogniflow"
    ]
  },
  {
    "id": "aegis-ai-interviewer",
    "githubUrl": "https://github.com/Tayyab-Tufail/aegis-ai-interviewer",
    "title": "Aegis AI Interviewer",
    "category": "Web / AI Engineering",
    "tags": [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Socket.IO",
      "Node.js",
      "OpenAI API",
      "Web Speech API"
    ],
    "description": "Real-time AI interviewing platform with live code execution, vocal feedback, and dynamic prompt engineering.",
    "summary": "Aegis is an intelligent full-stack mock interview application. It simulates a technical coding interview with an AI agent that listens, evaluates live code execution, and responds verbally with a real human-like voice. Featuring a dark glowing aesthetic, websockets for instant dual-way communication, and robust sandboxed code compilation.",
    "features": [
      "Real-time Socket.IO communication with an AI Evaluator",
      "Live Monaco Code Editor with Python and JS compilation",
      "Web Speech API integration for real voice AI responses",
      "Stunning dark glassmorphism design with animated visualizers"
    ],
    "result": "A complete end-to-end fullstack platform that conducts technical interviews autonomously with less than 200ms latency.",
    "context": "Full-stack application utilizing Socket.IO and Web Speech API to provide an immersive interview experience.",
    "images": [
      {
        "file": "aegis-ai-interviewer-landing.png",
        "caption": "The beautiful landing page introducing the Aegis AI Interviewer."
      },
      {
        "file": "aegis-ai-interviewer-configure.png",
        "caption": "Configuring the interview scenario, role, and strictness level."
      },
      {
        "file": "aegis-ai-interviewer-room.png",
        "caption": "The dark-themed live interview room environment."
      },
      {
        "file": "aegis-ai-interviewer-editor.png",
        "caption": "Writing Python code live in the embedded Monaco editor."
      },
      {
        "file": "aegis-ai-interviewer-evaluation.png",
        "caption": "The AI evaluating the submitted code and providing vocal feedback."
      }
    ],
    "sourceFolders": [
      "aegis-ai-interviewer"
    ]
  }
];
export const projects: Project[] = projectCatalog.map(project => ({
  ...project,
  images: (expandedGalleries as Record<string, ProjectImage[]>)[project.id] ?? project.images,
}));
