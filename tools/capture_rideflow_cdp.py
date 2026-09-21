import os
import sys
import time
import json
import subprocess
import urllib.request
import base64

app_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-rideflow'
index_html = os.path.join(app_dir, 'index.html').replace('\\', '/')
out_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\website\public\images'
os.makedirs(out_dir, exist_ok=True)

# Launch Edge with remote debugging port 9255
edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
user_data = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-cdp-9255'

cmd = [
    edge_path,
    '--remote-debugging-port=9255',
    '--remote-allow-origins=*',
    f'--user-data-dir={user_data}',
    '--headless',
    '--disable-gpu',
    '--window-size=1280,800',
    f'file:///{index_html}'
]

print('Launching Edge CDP process for RideFlow...')
proc = subprocess.Popen(cmd)
time.sleep(3)

import websocket

# Get WebSocket URL from http://127.0.0.1:9255/json
resp = urllib.request.urlopen('http://127.0.0.1:9255/json')
targets = json.loads(resp.read().decode('utf-8'))
ws_url = targets[0]['webSocketDebuggerUrl']

print('Connecting to CDP WebSocket:', ws_url)
ws = websocket.create_connection(ws_url)

def send_cdp(method, params=None):
    msg_id = int(time.time() * 1000) % 1000000
    req = {'id': msg_id, 'method': method, 'params': params or {}}
    ws.send(json.dumps(req))
    while True:
        r = json.loads(ws.recv())
        if r.get('id') == msg_id:
            return r.get('result', {})

print('Navigating CDP to file URL:', f'file:///{index_html}')
send_cdp('Page.navigate', {'url': f'file:///{index_html}'})
time.sleep(2)

# Set Viewport
send_cdp('Emulation.setDeviceMetricsOverride', {
    'width': 1280,
    'height': 800,
    'deviceScaleFactor': 1,
    'mobile': False
})

for i in range(1, 13):
    view_id = f'view-{i:02d}'
    js_code = f'''
        (function() {{
            document.querySelectorAll(".view-section").forEach(el => el.classList.remove("active"));
            const target = document.getElementById("{view_id}");
            if (target) target.classList.add("active");
        }})();
    '''
    res = send_cdp('Runtime.evaluate', {'expression': js_code})
    time.sleep(0.5)
    
    shot = send_cdp('Page.captureScreenshot', {'format': 'png'})
    img_data = shot.get('data')
    if img_data:
        out_name = f'rideflow-ui-{i:02d}.png'
        out_path = os.path.join(out_dir, out_name)
        with open(out_path, 'wb') as f:
            f.write(base64.b64decode(img_data))
        print(f'Captured view {i:02d}: {out_name} ({os.path.getsize(out_path)} bytes)')

ws.close()
proc.terminate()
print('All 12 RideFlow screenshots successfully captured via CDP!')
