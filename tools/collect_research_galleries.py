"""Collect authentic saved research outputs; preserve explicit archive provenance."""
import base64
import json
import re
import shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT.parent
catalog=json.loads(re.search(r'const projectCatalog: Project\[\] = ([\s\S]*?\n\]);',(ROOT/'website/lib/projects.ts').read_text(encoding='utf-8-sig')).group(1))
galleries={p['id']:p['images'].copy() for p in catalog}
provenance=[]
def copy(project,relative,caption):
    source=SOURCE/relative
    if not source.is_file(): raise FileNotFoundError(source)
    filename=f'{project}-archive-{len(galleries[project])+1:02d}{source.suffix.lower()}'
    shutil.copy2(source,ROOT/'assets/images'/filename)
    item={'file':filename,'caption':caption+' (Saved original project output.)'}
    galleries[project].append(item)
    provenance.append({**item,'project':project,'source':str(source.relative_to(SOURCE)),'kind':'archived-output'})

fin='FinBias_Delivery/FinBias_Delivery/graphs/'
for file,label in [('eda/class_distribution.png','Financial sentiment dataset class distribution'),('eda/sentence_length_by_class.png','Sentence length by sentiment class'),('eda/top_tfidf_terms_by_class.png','Most informative baseline terms by class'),('evaluation/validation_model_comparison.png','Baseline and FinBERT validation comparison'),('explainability/finbert_attribution_0.png','Token-level attribution for an example financial sentence'),('explainability/finbert_attribution_1.png','Token-level attribution for a second financial sentence')]: copy('finbias',fin+file,label)
brain='brain tumor detection/outputs/figures/'
for file,label in [('tumordetnet_training_curves.png','TumorDetNet training and validation curves'),('split_class_distribution.png','MRI class distribution across dataset splits'),('tumordetnet_secondary_confusion_matrix.png','Secondary-dataset evaluation confusion matrix'),('test_f1_score_comparison.png','Test F1 comparison across the two architectures'),('tumordetnet_secondary_drift.png','Secondary-dataset performance drift analysis')]: copy('brain-mri',brain+file,label)
water='water_quality_study_bundle (1)/graphs/'
for file,label in [('class_distribution.png','Potability class distribution'),('missing_values.png','Missing measurement audit'),('correlation_heatmap.png','Correlation between measured water properties'),('validation_metric_comparison.png','Validation comparison of the classification pipelines'),('random_forest_test_roc_curve.png','Selected random forest test ROC curve'),('random_forest_test_pr_curve.png','Selected random forest test precision: recall curve')]: copy('water-potability',water+file,label)
phishing='Phishing_detection_dissertation_final_delivery_2026-08-09/graphs/'
for file,label in [('13_metric_comparison_validation.png','Five-classifier validation comparison'),('15_roc_comparison_validation.png','Validation ROC comparison'),('20_reduced_feature_comparison_validation.png','Validation comparison after suspicious-feature removal'),('18_validation_risk_threshold_analysis.png','Validation risk-threshold analysis'),('30_computational_cost_comparison.png','Model computation cost comparison'),('31_repeated_cv_metric_distributions.png','Repeated cross-validation metric distributions')]: copy('phishing',phishing+file,label)
gesture='Head_Gesture_Epuck_Submission_20260808_FINAL/evidence/runs/'
for file,label in [('gesture_video_control/screenshots/route_selected_graph_a_c_shortest.jpg','Shortest route selected between waypoints A and C'),('gesture_video_control/screenshots/route_selected_graph_c_b_alternative.jpg','Alternative route selected between waypoints C and B'),('gesture_video_control/screenshots/waypoint_pickup_waypoint_reached.jpg','Pickup waypoint reached during the recorded scenario'),('gesture_video_control/screenshots/destination_reached.jpg','Destination reached in the gesture-control scenario'),('head_shake/screenshots/safety_stop_head_shake.jpg','Head-shake safety stop scenario'),('blocked_corridor/screenshots/safety_stop_obstacle.jpg','Obstacle stop in a blocked-corridor scenario')]: copy('gesture-robot',gesture+file,label)
auto='Vision_Based_Autonomous_Epuck_Final_Submission (3)/Vision_Based_Autonomous_Epuck_Final_Submission/'
for file,label in [('worlds/autonomous_epuck_interactive_preview.jpg','Preview of the interactive simulation world'),('evidence/interactive_five_obstacle_layout_final.png','Five-obstacle interactive simulation layout'),('evidence/phase2_camera_frame.png','Controller camera view for visual perception'),('evidence/controller_recovery_040s.jpg','Controller recovery recording at 40 seconds'),('evidence/controller_recovery_070s.jpg','Controller recovery recording at 70 seconds'),('evidence/workbook_scenario_summary.png','Scenario summary from the recorded experiment workbook')]: copy('autonomous-robot',auto+file,label)
notebook=SOURCE/'toxic_behaviour_classify/toxic_behaviour_classify/Visualizations.ipynb'
cells=json.loads(notebook.read_text(encoding='utf-8'))['cells']
for cell,label in [(4,'Toxic and non-toxic coarse-label distribution'),(6,'Contribution of the source datasets'),(8,'Composition of human and model-assisted label sources'),(10,'Word-count distribution in the prepared dataset'),(16,'Label counts by dataset source and category'),(21,'Text-length, label-source, and toxicity correlations')]:
    output=next(o['data']['image/png'] for o in cells[cell]['outputs'] if 'image/png' in o.get('data',{}))
    filename=f'toxicity-archive-{len(galleries["toxicity"])+1:02d}.png'
    (ROOT/'assets/images'/filename).write_bytes(base64.b64decode(''.join(output)))
    item={'file':filename,'caption':label+' (Saved notebook output.)'}
    galleries['toxicity'].append(item)
    provenance.append({**item,'project':'toxicity','source':str(notebook.relative_to(SOURCE)),'cell':cell,'kind':'archived-notebook-output'})

# Frames are extracted from the retained recording, not described as fresh missions.
import cv2
video=SOURCE/'MedBot_Delivery_Complete_2026-08-15/MedBot/docs/webots_multitask_demo.mp4'
capture=cv2.VideoCapture(str(video))
fps=capture.get(cv2.CAP_PROP_FPS)
frames=capture.get(cv2.CAP_PROP_FRAME_COUNT)
for fraction in [.12,.30,.48,.66,.84]:
    position=int(frames*fraction)
    capture.set(cv2.CAP_PROP_POS_FRAMES,position)
    ok,frame=capture.read()
    if not ok: raise RuntimeError('Could not extract the original MedBot video frame')
    filename=f'medbot-recording-{len(galleries["medbot"])+1:02d}.jpg'
    cv2.imwrite(str(ROOT/'assets/images'/filename),frame)
    seconds=position/fps
    item={'file':filename,'caption':f'Multi-task hospital mission at {seconds:.1f}s: frame from the original Webots recording.'}
    galleries['medbot'].append(item)
    provenance.append({**item,'project':'medbot','source':str(video.relative_to(SOURCE)),'timestamp':seconds,'kind':'recorded-simulation-frame'})
capture.release()
selected={key:galleries[key] for key in ['finbias','brain-mri','water-potability','phishing','gesture-robot','autonomous-robot','toxicity','medbot']}
(ROOT/'assets/research-expanded-manifest.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'assets/research-expanded-provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:len(v) for k,v in selected.items()}))
