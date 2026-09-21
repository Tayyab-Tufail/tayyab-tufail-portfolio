"""Capture 10 additional Asaan Mazdoor screens (ui-18 through ui-27)."""
import json
import time
import shutil
from pathlib import Path
from browser_capture import Browser, ROOT

# The serve.mjs server must be running on port 8089 pointing to .capture-asaan-export
PUBLIC_IMAGES = ROOT / 'website/public/images'
GALLERIES_JSON = ROOT / 'website/lib/project-galleries.json'

# Extra screens to capture (screen_route, label, caption)
EXTRA_SCREENS = [
    ('ChatScreen',              'Chat list',                    'Chat list: all active messaging conversations between customers and professionals.'),
    ('NotificationsScreen',     'Notifications',               'Notifications: in-app activity alerts and order status updates.'),
    ('MyProfileScreen',         'My profile',                  'My profile: user account overview with edit options and work history.'),
    ('MyOrdersScreen',          'My orders',                   'My orders: active and completed service orders with status tracking.'),
    ('MyServicesScreen',        'My services',                 'My services: professional's offered service listings and management panel.'),
    ('WalletScreen',            'Wallet',                       'Wallet: payment balance, transaction history, and withdrawal options.'),
    ('ProfessionalDashboardScreen', 'Professional dashboard',  'Professional dashboard: job assignments, earnings summary, and quick-action panel.'),
    ('ViewJobApplicationsScreen','Job applications',           'Job applications: list of professionals who applied for a customer's posted job.'),
    ('PaymentDetailScreen',     'Payment detail',              'Payment detail: Stripe card form and payment confirmation screen.'),
    ('PastOrdersScreen',        'Past orders',                 'Past orders: completed service order history with ratings and review options.'),
]

def load_galleries():
    return json.loads(GALLERIES_JSON.read_text(encoding='utf-8'))

def save_galleries(data):
    GALLERIES_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')

galleries = load_galleries()
asaan_gallery = galleries.get('asaan-mazdoor', [])
# Find the next sequence number
existing_nums = []
for item in asaan_gallery:
    fname = item['file']
    if fname.startswith('asaan-mazdoor-ui-') and fname.endswith('.png'):
        try:
            num = int(fname[len('asaan-mazdoor-ui-'):-len('.png')])
            existing_nums.append(num)
        except ValueError:
            pass
start_num = max(existing_nums) + 1 if existing_nums else 18
print(f'Starting from ui-{start_num:02d}', flush=True)

captured = []
with Browser(430, 1000, 9239) as browser:
    for i, (route, label, caption) in enumerate(EXTRA_SCREENS):
        num = start_num + i
        filename = f'asaan-mazdoor-ui-{num:02d}.png'
        asset_path = ROOT / 'assets/images' / filename
        public_path = PUBLIC_IMAGES / filename
        
        print(f'Capturing {route} -> {filename}', flush=True)
        try:
            browser.goto(f'http://127.0.0.1:8089/?screen={route}', 5)
            body = browser.text()
            
            if not body.strip() or 'Uncaught Error' in body or 'Something went wrong' in body:
                print(f'  SKIP {route}: bad render - {body[:200]}', flush=True)
                continue
            
            # Take screenshot
            browser.screenshot(asset_path)
            # Copy to public images
            shutil.copy2(str(asset_path), str(public_path))
            
            entry = {'file': filename, 'caption': caption}
            captured.append(entry)
            print(f'  OK: {filename}', flush=True)
            
        except Exception as e:
            print(f'  ERROR {route}: {e}', flush=True)
            continue

# Append new entries to the gallery (insert before original-presentation)
if captured:
    # Find position of original-presentation
    insert_pos = len(asaan_gallery)
    for j, item in enumerate(asaan_gallery):
        if item['file'] == 'asaan-mazdoor-original-presentation.png':
            insert_pos = j
            break
    
    for k, entry in enumerate(captured):
        asaan_gallery.insert(insert_pos + k, entry)
    
    galleries['asaan-mazdoor'] = asaan_gallery
    save_galleries(galleries)
    print(f'\nAdded {len(captured)} new images to asaan-mazdoor gallery.', flush=True)
    print('Gallery now has', len(asaan_gallery), 'images.', flush=True)
else:
    print('No images captured.', flush=True)
