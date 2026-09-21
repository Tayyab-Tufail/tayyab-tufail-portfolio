import os
import sys
import time
from playwright.sync_api import sync_playwright

app_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\.capture-nexamart'
index_html = os.path.join(app_dir, 'index.html').replace('\\', '/')
out_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio\website\public\images'
os.makedirs(out_dir, exist_ok=True)

def run_capture():
    print('Starting Playwright capture for 12 NexaMart views...')
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()
        
        file_url = f'file:///{index_html}'
        page.goto(file_url)
        time.sleep(1)
        
        for i in range(1, 13):
            view_id = f'view-{i:02d}'
            page.evaluate(f'''() => {{
                document.querySelectorAll(".view-section").forEach(el => el.classList.remove("active"));
                const target = document.getElementById("{view_id}");
                if (target) target.classList.add("active");
            }}''')
            time.sleep(0.5)
            
            out_name = f'nexamart-ui-{i:02d}.png'
            out_path = os.path.join(out_dir, out_name)
            page.screenshot(path=out_path, full_page=False)
            print(f'Captured view {i:02d}: {out_name} ({os.path.getsize(out_path)} bytes)')
            
        browser.close()
    print('All 12 NexaMart screenshots captured successfully!')

if __name__ == '__main__':
    run_capture()
