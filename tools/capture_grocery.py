import json,time
from browser_capture import Browser,ROOT
samples=ROOT.parent/'grocery_items_client_delivery/client_delivery/example_images'
manifest=[]
def capture(browser,name,caption):
    file=f'grocery-ui-{len(manifest)+1:02d}.png'
    browser.evaluate('window.scrollTo(0,0)')
    browser.screenshot(ROOT/'assets/images'/file)
    manifest.append({'file':file,'caption':caption,'source':name,'kind':'live-ui-capture','project':'grocery'})
    (ROOT/'assets/grocery-expanded-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(manifest[-1]),flush=True)
with Browser(1440,1080,9235) as browser:
    browser.goto('http://127.0.0.1:7862',6)
    assert 'Grocery Item Recognition' in browser.text()
    capture(browser,'original Gradio application','Original Grocery Item Recognition interface, running locally with the retained EfficientNet checkpoint.')
    for sample in sorted(samples.glob('*.jpg'))[:6]:
        browser.goto('http://127.0.0.1:7862',2)
        browser.upload('input[type=file]',sample)
        time.sleep(2)
        browser.evaluate("Array.from(document.querySelectorAll('button')).find(x=>x.textContent.trim()==='Run Inference').click()")
        for _ in range(90):
            time.sleep(1)
            body=browser.text()
            if 'Top prediction:' in body: break
        else: raise RuntimeError('Inference did not finish: '+body[-800:])
        summary=body[body.index('Top prediction:'):].split('\n')[0]
        capture(browser,str(sample.relative_to(ROOT.parent)),f'Live inference on the supplied {sample.stem.replace("_"," ")} example. {summary}')
