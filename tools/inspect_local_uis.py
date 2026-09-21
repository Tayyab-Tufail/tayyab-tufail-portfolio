import json
from browser_capture import Browser,ROOT
with Browser(1440,1080,9232) as browser:
    for name,url in [('api','http://127.0.0.1:5175/specification'),('finbias','http://127.0.0.1:5001'),('fire','http://127.0.0.1:7861'),('weapon','http://127.0.0.1:5176')]:
        browser.goto(url,7)
        data={'name':name,'text':browser.text()[:6500],'inputs':browser.evaluate("Array.from(document.querySelectorAll('input,textarea,select')).map(x=>({tag:x.tagName,type:x.type,placeholder:x.placeholder,id:x.id}))"),'buttons':browser.evaluate("Array.from(document.querySelectorAll('button')).map(x=>x.textContent.trim()).filter(Boolean)")}
        (ROOT/f'docs/{name}-ui-state.json').write_text(json.dumps(data,indent=2),encoding='utf-8')
        browser.screenshot(ROOT/f'docs/{name}-ui-live.png')
        print(json.dumps(data),flush=True)
