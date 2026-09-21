import json,re,shutil,sys,time,urllib.request
from browser_capture import Browser,ROOT
project=sys.argv[1]
manifest=[]
def shot(browser,caption):
    file=f'{project}-ui-{len(manifest)+1:02d}.png'
    time.sleep(1)
    browser.screenshot(ROOT/'assets/images'/file)
    manifest.append({'file':file,'caption':caption,'kind':'live-ui-capture','project':project})
    (ROOT/f'assets/{project}-expanded-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(manifest[-1]),flush=True)
def click_text(browser,text,prefix=False):
    method='startsWith' if prefix else 'includes'
    browser.evaluate(f'Array.from(document.querySelectorAll("button")).find(x=>x.textContent.trim().{method}({json.dumps(text)})).click()')
def section(browser,title):
    browser.evaluate(f'Array.from(document.querySelectorAll("h2,h3")).find(x=>x.textContent.trim()==={json.dumps(title)}).scrollIntoView({{block:"start"}})')

with Browser(1440,1080,{'finbias':9236,'weapon-detection':9237,'api-test-lab':9238,'fire-smoke':9239}[project]) as browser:
 if project=='weapon-detection':
    browser.goto('http://127.0.0.1:5176',5)
    for _ in range(60):
        if 'Model: best.pt' in browser.text(): break
        time.sleep(1)
    assert 'Model: best.pt' in browser.text(), 'Backend not ready'
    shot(browser,'Live image-inference console connected to the original FastAPI backend and retained YOLO model.')
    click_text(browser,'Video Inference',True); time.sleep(1)
    shot(browser,'Live video-inference interface with confidence, IoU, and input-size controls.')
    click_text(browser,'Performance Metrics',True); time.sleep(2)
    shot(browser,'Performance dashboard displaying the project’s saved test metrics.')
    section(browser,'Threshold Sweep'); shot(browser,'Interactive threshold-sweep charts populated from the saved evaluation artifacts.')
    section(browser,'Latency Rows'); shot(browser,'Latency and threshold tables in the running detection console.')
    browser.evaluate('window.scrollTo(0,0)'); click_text(browser,'Dataset & System',True); time.sleep(2)
    shot(browser,'Dataset and system overview from the running backend.')
    section(browser,'Class Distribution'); shot(browser,'Class-distribution view populated from the project dataset summary.')
    section(browser,'Source Distribution'); shot(browser,'Source-distribution and system detail views in the running application.')
 elif project=='api-test-lab':
    for route,label in [('/','Workspace dashboard'),('/settings','Local service settings'),('/results','Report collection'),('/specification','Specification import'),('/operations','Operations workspace'),('/generate','Test-generation workspace')]:
        browser.goto('http://127.0.0.1:5175'+route,4)
        assert 'Evidence Lab' in browser.text()
        shot(browser,label+': captured from the running API Test Evidence Lab application.')
    # Import the actual local backend contract; no paid generation or fabricated tests.
    contract=json.load(urllib.request.urlopen('http://127.0.0.1:8000/openapi.json',timeout=15))
    (ROOT/'assets/api-local-backend-contract.json').write_text(json.dumps(contract,indent=2),encoding='utf-8')
    browser.goto('http://127.0.0.1:5175/specification',3)
    browser.click('#spec'); browser.call('Input.insertText',{'text':json.dumps(contract,indent=2)})
    time.sleep(2)
    shot(browser,'Live validation of the local FastAPI backend’s actual OpenAPI specification.')
    click_text(browser,'Parse specification')
    for _ in range(30):
        time.sleep(1)
        if browser.evaluate('location.pathname')=='/operations': break
    assert browser.evaluate('location.pathname')=='/operations',browser.text()[-600:]
    shot(browser,'Parsed operations from the actual local backend contract; no generated or executed test outcomes are simulated.')
 elif project=='fire-smoke':
    browser.goto('http://127.0.0.1:7861',5)
    browser.wait_text('Fire and Smoke Detection',120)
    shot(browser,'Running original Gradio image-detection interface with confidence and inference-size controls.')
    browser.evaluate("Array.from(document.querySelectorAll('button[role=tab]')).find(x=>x.textContent.trim()==='Video').click()")
    shot(browser,'Running original video-detection interface with input, annotated output, and download components.')
    catalog=json.loads(re.search(r'const projectCatalog: Project\[\] = ([\s\S]*?\n\]);',(ROOT/'website/lib/projects.ts').read_text(encoding='utf-8-sig')).group(1))
    manifest.extend(next(p['images'] for p in catalog if p['id']=='fire-smoke'))
    for file,label in [('results_yolov8s_training_losses.png','Selected YOLOv8s training losses'),('results_validation_metric_comparison.png','Validation comparison between YOLOv8n and YOLOv8s'),('results_test_error_distribution.png','Held-out test error distribution')]:
        source=ROOT.parent/'fire_smoke_detection_gui_delivery/delivery/graphs'/file
        target='fire-smoke-'+file
        shutil.copy2(source,ROOT/'assets/images'/target)
        manifest.append({'file':target,'caption':label+' (Saved original experiment output.)','source':str(source.relative_to(ROOT.parent)),'kind':'archived-output'})
    (ROOT/'assets/fire-smoke-expanded-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 elif project=='finbias':
    browser.goto('http://127.0.0.1:5001',6)
    browser.wait_text('FinBias Sentiment Studio',120)
    shot(browser,'Running original FinBias Sentiment Studio, using local CPU inference.')
    for example in ['Positive','Neutral','Negative']:
        click_text(browser,'Clear'); time.sleep(.6)
        click_text(browser,example); time.sleep(.7)
        click_text(browser,'Analyze sentiment')
        for _ in range(120):
            time.sleep(1)
            body=browser.text()
            if 'Inference failed' in body: raise RuntimeError(body[-1500:])
            if re.search(r'\d+\.\d+% confidence',body): break
        else: raise RuntimeError('Sentiment inference timed out')
        time.sleep(2)
        shot(browser,f'Live FinBERT result for the original {example.lower()} example, computed locally on CPU.')
        browser.evaluate("document.querySelector('.probability-card').scrollIntoView({block:'start'})")
        shot(browser,f'Live class probabilities and session history after analyzing the {example.lower()} example.')
        browser.evaluate('window.scrollTo(0,0)')
    browser.evaluate("document.querySelector('.history-card').scrollIntoView({block:'start'})")
    shot(browser,'Session history of the three freshly computed financial-sentiment predictions.')
