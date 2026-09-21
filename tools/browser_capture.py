"""Local-only headless Edge capture helper for the original project interfaces."""
import base64
import json
import subprocess
import time
import urllib.request
from pathlib import Path
import websocket

ROOT = Path(__file__).resolve().parents[1]
EDGE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

class Browser:
    @classmethod
    def attach(cls,port):
        browser=cls.__new__(cls)
        targets=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json',timeout=3))
        target=next(t for t in targets if t['type']=='page')
        browser.ws=websocket.create_connection(target['webSocketDebuggerUrl'],timeout=40,suppress_origin=True)
        browser.sequence=0
        browser.events=[]
        return browser
    def __init__(self, width=1440, height=1000, port=9232):
        self.process = subprocess.Popen([EDGE, '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', f'--remote-debugging-port={port}', f'--user-data-dir={ROOT / (".capture-cdp-" + str(port))}', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)
        for _ in range(60):
            try:
                targets = json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/json', timeout=2))
                target = next(t for t in targets if t['type'] == 'page')
                break
            except Exception:
                time.sleep(.5)
        else:
            raise RuntimeError('Headless browser did not start')
        self.ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=40, suppress_origin=True)
        self.sequence = 0
        self.events = []
        self.call('Page.enable')
        self.call('Runtime.enable')
        self.call('Network.enable')
        self.resize(width, height)
    def call(self, method, params=None):
        self.sequence += 1
        ident = self.sequence
        self.ws.send(json.dumps({'id':ident, 'method':method, 'params':params or {}}))
        while True:
            response = json.loads(self.ws.recv())
            if response.get('id') == ident:
                if 'error' in response: raise RuntimeError(response['error'])
                return response.get('result', {})
            self.events.append(response)
    def evaluate(self, expression):
        result = self.call('Runtime.evaluate', {'expression':expression, 'returnByValue':True, 'awaitPromise':True})
        if 'exceptionDetails' in result: raise RuntimeError(result['exceptionDetails'])
        return result.get('result', {}).get('value')
    def resize(self, width, height, mobile=False):
        self.call('Emulation.setDeviceMetricsOverride', {'width':width, 'height':height, 'deviceScaleFactor':1, 'mobile':mobile})
    def goto(self, url, seconds=4):
        self.call('Page.navigate', {'url':url})
        time.sleep(seconds)
    def wait_text(self,text,timeout=60):
        end=time.time()+timeout
        while time.time()<end:
            if text in self.text(): return
            time.sleep(1)
        raise RuntimeError('Timed out waiting for '+text+': '+self.text()[:500])
    def screenshot(self, path, full=False):
        options = {'format':'png', 'captureBeyondViewport':bool(full)}
        if full:
            size = self.call('Page.getLayoutMetrics')['cssContentSize']
            options['clip'] = {**size, 'scale':1}
        data = self.call('Page.captureScreenshot', options)
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        Path(path).write_bytes(base64.b64decode(data['data']))
    def click(self, selector):
        return self.evaluate(f'document.querySelector({json.dumps(selector)}).click()')
    def text(self):
        return self.evaluate("document.body.innerText + '\\n' + Array.from(document.querySelectorAll('textarea,input:not([type=password])')).map(x=>x.value).filter(Boolean).join('\\n')")
    def upload(self, selector, path):
        doc = self.call('DOM.getDocument')
        node = self.call('DOM.querySelector', {'nodeId':doc['root']['nodeId'], 'selector':selector})
        self.call('DOM.setFileInputFiles', {'nodeId':node['nodeId'], 'files':[str(Path(path).resolve())]})
    def close(self):
        try: self.call('Browser.close')
        except Exception: pass
        self.ws.close()
    def __enter__(self): return self
    def __exit__(self, *_): self.close()

if __name__ == '__main__':
    import sys
    with Browser() as browser:
        browser.goto(sys.argv[1], 8)
        browser.screenshot(sys.argv[2])
        print(json.dumps(browser.text()[:8000], ensure_ascii=True))
