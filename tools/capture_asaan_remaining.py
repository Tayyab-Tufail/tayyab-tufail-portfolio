"""Capture remaining 3 real Asaan Mazdoor screens (ui-21, ui-22, ui-23)."""
import json, time, shutil
from pathlib import Path
from browser_capture import Browser, ROOT

PUBLIC  = ROOT / 'website/public/images'
GALLERY = ROOT / 'website/lib/project-galleries.json'

def goto(b, screen, wait=6):
    b.goto(f'http://127.0.0.1:8089/?screen={screen}', wait)

def scroll(b, px):
    b.evaluate(f'window.scrollBy(0, {px})')
    time.sleep(1.5)

def save(b, num, caption):
    fname = f'asaan-mazdoor-ui-{num:02d}.png'
    b.screenshot(ROOT / 'assets/images' / fname)
    shutil.copy2(str(ROOT / 'assets/images' / fname), str(PUBLIC / fname))
    print(f'  OK {fname}', flush=True)
    return {'file': fname, 'caption': caption}

entries = []
with Browser(430, 900, 9242) as b:

    # 1: NewServiceScreen: wait for it to fully render, then search
    print('Capturing NewServiceScreen with search...', flush=True)
    goto(b, 'NewServiceScreen', 7)
    # Try finding input by waiting longer then using TextInput
    time.sleep(3)
    # Type using keyboard simulation without querySelector
    try:
        # Click in the middle of the screen first to focus
        b.call('Input.dispatchMouseEvent', {
            'type': 'mousePressed', 'x': 215, 'y': 100,
            'button': 'left', 'clickCount': 1
        })
        b.call('Input.dispatchMouseEvent', {
            'type': 'mouseReleased', 'x': 215, 'y': 100,
            'button': 'left', 'clickCount': 1
        })
        time.sleep(1)
        # Scroll to show filtered list without search (show full list)
        scroll(b, 200)
        entries.append(save(b, 21,
            'Service category list: full grid of available trades including plumbing, carpentry, electrical, and more.'))
    except Exception as e:
        print(f'  SKIP ui-21: {e}', flush=True)

    # 2: PersonalInformation form (professional profile screen)
    print('Capturing PersonalInformation...', flush=True)
    goto(b, 'PersonalInformation', 6)
    entries.append(save(b, 22,
        'Personal information form: professional updates full name, mobile number, gender, and years of experience.'))

    # 3: CustomerSignup full form
    print('Capturing CustomerSignup...', flush=True)
    goto(b, 'CustomerSignup', 6)
    entries.append(save(b, 23,
        'Customer sign-up form: complete registration with name, phone number, gender selection, and password fields.'))

# ─── update gallery ─────────────────────────────────────────────────────────
galleries = json.loads(GALLERY.read_text(encoding='utf-8'))
asaan = galleries['asaan-mazdoor']
insert_at = len(asaan) - 1  # before original-presentation
for i, e in enumerate(entries):
    asaan.insert(insert_at + i, e)
galleries['asaan-mazdoor'] = asaan
GALLERY.write_text(json.dumps(galleries, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'\nDone -- added {len(entries)} more images. Gallery total: {len(asaan)}.', flush=True)
