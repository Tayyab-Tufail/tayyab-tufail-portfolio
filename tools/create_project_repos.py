import os
import sys
import subprocess
import json

projects_meta = [
    {
        "id": "rideflow",
        "repo": "rideflow-ride-hailing-app",
        "title": "RideFlow — Full-Stack Ride-Hailing Platform",
        "desc": "Full-stack mobile ride-hailing application inspired by Uber, Yango, and InDrive. Built with React Native, Node.js microservices, Socket.IO real-time dispatch, and MongoDB Atlas. Features Passenger booking with live GPS tracking, Driver partner dispatch radar with wallet cashouts, and Admin fleet telemetry command center.",
        "tags": ["React Native", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Google Maps API", "Stripe API", "Redux Toolkit"],
        "folder": "rideflow-ride-hailing-app"
    },
    {
        "id": "nexamart",
        "repo": "nexamart-mern-ecommerce-engine",
        "title": "NexaMart — MERN Stack E-Commerce Engine",
        "desc": "Enterprise-grade MERN Stack e-commerce platform with Redis caching, Stripe checkout, and real-time sales telemetry. Engineered with React 19, Redux Toolkit, Express.js REST APIs, MongoDB Atlas, and sub-50ms Redis cache layer.",
        "tags": ["MongoDB", "Express.js", "React", "Node.js", "Redux Toolkit", "Stripe API", "Redis", "Docker"],
        "folder": ".capture-nexamart"
    },
    {
        "id": "asaan-mazdoor",
        "repo": "asaan-mazdoor-service-marketplace",
        "title": "Asaan Mazdoor — Doorstep Service Marketplace",
        "desc": "A two-sided mobile service marketplace connecting customers with local blue-collar professionals and skilled tradesmen. Built with React Native, Express.js REST APIs, and MongoDB.",
        "tags": ["React Native", "Express.js", "MongoDB", "Node.js", "Redux Toolkit"],
        "folder": ".capture-asaan-source"
    },
    {
        "id": "api-test-lab",
        "repo": "api-test-evidence-lab",
        "title": "API Test Evidence Lab",
        "desc": "A developer workspace that turns OpenAPI and Swagger specifications into structured API test cases, validates requests against contracts, and generates downloadable JSON execution evidence.",
        "tags": ["React", "TypeScript", "FastAPI", "Claude API", "Mockoon"],
        "folder": ".capture-api"
    },
    {
        "id": "medbot",
        "repo": "medbot-robotics-ai",
        "title": "MedBot — Autonomous Hospital Delivery Robot",
        "desc": "Simulated autonomous hospital delivery robot translating natural language instructions into structured navigation missions using DistilBERT intent classification, A* path planning, and Webots robotics simulation.",
        "tags": ["Python", "DistilBERT", "Webots", "Whisper", "A* Navigation"],
        "folder": "medbot-robotics-ai"
    },
    {
        "id": "fire-smoke",
        "repo": "fire-smoke-detection",
        "title": "Fire & Smoke Real-Time Computer Vision Detector",
        "desc": "Computer vision pipeline for early fire and smoke hazard detection using YOLOv8, PyTorch, and Gradio inference dashboard.",
        "tags": ["PyTorch", "YOLOv8", "OpenCV", "Gradio", "Python"],
        "folder": "fire-smoke-detection"
    },
    {
        "id": "weapon-detection",
        "repo": "weapon-detection-console",
        "title": "Weapon Detection Console",
        "desc": "Real-time object detection system for automated threat analysis (pistols, knives) with FastAPI backend and React frontend dashboard.",
        "tags": ["YOLOv8", "FastAPI", "React", "TypeScript", "OpenCV"],
        "folder": "weapon-detection-console"
    },
    {
        "id": "finbias",
        "repo": "finbias-sentiment-analysis",
        "title": "FinBias — Financial Sentiment Analysis Engine",
        "desc": "NLP sentiment analysis comparing TF-IDF baselines with fine-tuned FinBERT models for financial news and market earnings reports.",
        "tags": ["FinBERT", "Transformers", "PyTorch", "scikit-learn", "Python"],
        "folder": "finbias-sentiment-analysis"
    },
    {
        "id": "brain-mri",
        "repo": "brain-mri-tumor-detection",
        "title": "Brain MRI Tumor Detection Classifier",
        "desc": "Deep learning image classification pipeline comparing baseline CNNs with custom TumorDetNet architectures across 4 MRI tumor categories.",
        "tags": ["PyTorch", "CNN", "OpenCV", "scikit-learn", "Python"],
        "folder": "brain-mri-tumor-detection"
    },
    {
        "id": "grocery",
        "repo": "grocery-classification",
        "title": "Grocery Product Visual Classifier",
        "desc": "Computer vision classifier evaluating EfficientNet-B0, ResNet50, and MobileNetV3 for automated retail product recognition.",
        "tags": ["PyTorch", "EfficientNet", "OpenCV", "Python"],
        "folder": "grocery-classification"
    },
    {
        "id": "phishing",
        "repo": "phishing-detection",
        "title": "Phishing Webpage & URL Detector",
        "desc": "Machine learning security pipeline analyzing webpage features, domain structure, and SSL metrics to identify phishing threats with SHAP/LIME explainability.",
        "tags": ["scikit-learn", "XGBoost", "SHAP", "LIME", "Python"],
        "folder": "phishing-detection"
    },
    {
        "id": "gesture-robot",
        "repo": "gesture-controlled-robot",
        "title": "Gesture & Voice Controlled Robot",
        "desc": "Multimodal robot control combining head gesture tracking, MediaPipe pose detection, offline speech recognition, and state machine navigation.",
        "tags": ["MediaPipe", "OpenCV", "Python", "Vosk Speech", "Webots"],
        "folder": "gesture-controlled-robot"
    },
    {
        "id": "autonomous-robot",
        "repo": "autonomous-lane-following-robot",
        "title": "Autonomous Lane-Following & Obstacle Robot",
        "desc": "Simulated autonomous vehicle navigation featuring lane detection, PID steering control, and proximity sensor obstacle avoidance.",
        "tags": ["Webots", "OpenCV", "PID Control", "Python", "ROS"],
        "folder": "autonomous-lane-following-robot"
    },
    {
        "id": "toxicity",
        "repo": "multilingual-toxicity-analysis",
        "title": "Multilingual Toxicity Classifier",
        "desc": "NLP text classification comparing BERT, DistilBERT, and DeBERTa across a 10-category toxicity benchmark dataset.",
        "tags": ["DeBERTa", "BERT", "Transformers", "PyTorch", "Python"],
        "folder": "multilingual-toxicity-analysis"
    },
    {
        "id": "water-potability",
        "repo": "water-potability-classifier",
        "title": "Water Potability Assessment Pipeline",
        "desc": "Tabular machine learning pipeline evaluating water quality measurements with SMOTE balancing, threshold tuning, and multi-model benchmarking.",
        "tags": ["scikit-learn", "XGBoost", "Pandas", "Python"],
        "folder": "water-potability-classifier"
    },
    {
        "id": "food-app",
        "repo": "food-hunt-mobile-app",
        "title": "Food Hunt — Mobile Ordering Application",
        "desc": "Cross-platform mobile food ordering interface built with React Native, Redux Toolkit cart state, and Expo navigation.",
        "tags": ["React Native", "Expo", "Redux Toolkit", "TypeScript"],
        "folder": ".capture-food-export"
    },
    {
        "id": "cybershield",
        "repo": "cybershield-mobile-app",
        "title": "CyberShield — Social Mobile App",
        "desc": "React Native social mobile application featuring dark UI theme, feed discovery, direct messaging, and user profile management.",
        "tags": ["React Native", "Expo", "TypeScript", "Tailwind CSS"],
        "folder": ".capture-social-export"
    }
]

base_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio'

def run_cmd(cmd, cwd=base_dir):
    p = subprocess.run(cmd, shell=True, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return p.stdout + '\n' + p.stderr

created_urls = {}

for p in projects_meta:
    folder_path = os.path.join(base_dir, p['folder'])
    os.makedirs(folder_path, exist_ok=True)
    
    # Create gitignore if missing
    gi = os.path.join(folder_path, '.gitignore')
    if not os.path.exists(gi):
        with open(gi, 'w', encoding='utf-8') as f:
            f.write("node_modules/\n.next/\n__pycache__/\n*.pyc\n.DS_Store\n")
            
    # Create README.md if missing or update it
    rm = os.path.join(folder_path, 'README.md')
    with open(rm, 'w', encoding='utf-8') as f:
        f.write(f"# {p['title']}\n\n{p['desc']}\n\n## Tech Stack\n" + "\n".join([f"- {t}" for t in p['tags']]) + f"\n\n---\nCreated by [Tayyab Tufail](https://github.com/Tayyab-Tufail)\n")
        
    print(f"\n--- Initializing and Publishing {p['repo']} ---")
    run_cmd("git init", cwd=folder_path)
    run_cmd("git add .", cwd=folder_path)
    run_cmd('git commit -m "Initial commit for ' + p['repo'] + '"', cwd=folder_path)
    
    # gh repo create
    gh_cmd = f'"C:\\Program Files\\GitHub CLI\\gh.exe" repo create {p["repo"]} --public --source=. --remote=origin --push'
    res = run_cmd(gh_cmd, cwd=folder_path)
    print(res)
    
    repo_url = f"https://github.com/Tayyab-Tufail/{p['repo']}"
    created_urls[p['id']] = repo_url
    print(f"Published {p['id']} -> {repo_url}")

# Write created_urls to a JSON file
with open(os.path.join(base_dir, 'tools', 'project_repo_urls.json'), 'w', encoding='utf-8') as f:
    json.dump(created_urls, f, indent=2)

print("\nSUCCESS: All individual project repositories created and pushed to GitHub!")
