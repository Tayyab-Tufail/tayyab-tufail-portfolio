import json,time
from browser_capture import Browser,ROOT
def save(browser,project,filename,caption,route):
    browser.screenshot(ROOT/'assets/images'/filename)
    path=ROOT/f'assets/{project}-expanded-manifest.json'
    data=json.loads(path.read_text(encoding='utf-8'))
    data=[x for x in data if x['file'] not in [filename,'cybershield-ui-08.png']]
    data.append({'file':filename,'caption':caption,'route':route,'project':project,'kind':'original-component-preview'})
    path.write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding='utf-8')
    print(filename,flush=True)
with Browser(430,1000,9240) as browser:
    browser.goto('http://127.0.0.1:8088/?screen=MyProfileScreen',5)
    browser.wait_text('Hammas Rashid',60)
    save(browser,'cybershield','cybershield-ui-09.png','Original profile screen with the sample name supplied in the app source. Local web preview.','MyProfileScreen')
    browser.goto('http://127.0.0.1:8089/?screen=NewServiceScreen',5)
    browser.wait_text('Select from the list',60)
    inputs=browser.evaluate("Array.from(document.querySelectorAll('input')).map(x=>({placeholder:x.placeholder,type:x.type}))")
    print(json.dumps(inputs),flush=True)
    browser.evaluate("document.querySelector('input').focus()")
    browser.call('Input.insertText',{'text':'Plumb'})
    time.sleep(2)
    save(browser,'asaan-mazdoor','asaan-mazdoor-ui-16.png','Service-category search for plumbing, using the original screen’s local filtering.','NewServiceScreen:search')
    browser.goto('http://127.0.0.1:8089/?screen=SubService',3)
    browser.wait_text('AC Installation Service',60)
    browser.evaluate("document.querySelector('[role=checkbox],input[type=checkbox]').click()")
    time.sleep(1)
    save(browser,'asaan-mazdoor','asaan-mazdoor-ui-17.png','AC service selection state in the original component. No booking or payment is submitted.','SubService:selection')
