"""Capture 6 real Asaan Mazdoor screens. Verifies serve is up before starting."""
import json, time, shutil, urllib.request
from pathlib import Path
from browser_capture import Browser, ROOT

PUBLIC  = ROOT / 'website/public/images'
GALLERY = ROOT / 'website/lib/project-galleries.json'

# Verify serve is up
for attempt in range(10):
    try:
        urllib.request.urlopen('http://127.0.0.1:8089/', timeout=3)
        print('Serve OK on port 8089', flush=True)
        break
    except Exception as e:
        print(f'Waiting for serve... {e}', flush=True)
        time.sleep(2)
else:
    raise RuntimeError('Port 8089 not available')

def goto(b, screen, wait=6):
    b.goto(f'http://127.0.0.1:8089/?screen={screen}', wait)

def scroll(b, px):
    b.evaluate(f'window.scrollBy(0, {px})')
    time.sleep(1.5)

def save(b, num, caption):
    fname = f'asaan-mazdoor-ui-{num:02d}.png'
    asset = ROOT / 'assets/images' / fname
    asset.parent.mkdir(parents=True, exist_ok=True)
    b.screenshot(asset)
    shutil.copy2(str(asset), str(PUBLIC / fname))
    kb = round(asset.stat().st_size / 1024, 1)
    print(f'  Saved {fname} ({kb} KB)', flush=True)
    return {'file': fname, 'caption': caption}

entries = []
with Browser(430, 900, 9243) as b:

    # Screen 1: PostJobScreen top
    print('1/6 PostJobScreen top...', flush=True)
    goto(b, 'PostJobScreen', 7)
    entries.append(save(b, 18,
        'Post a job form: title, description, and service category fields for customer job posting.'))

    # Screen 2: PostJobScreen scrolled (location, payment, submit)
    print('2/6 PostJobScreen scrolled...', flush=True)
    scroll(b, 800)
    entries.append(save(b, 19,
        'Post a job continued: location entry, optional photo, payment method, and submit button.'))

    # Screen 3: TermsAndConditions scrolled to body text
    print('3/6 TermsAndConditions scrolled...', flush=True)
    goto(b, 'TermsAndConditions', 6)
    scroll(b, 400)
    entries.append(save(b, 20,
        'Terms and conditions: policy text covering user responsibilities, prohibited conduct, and IP rights.'))

    # Screen 4: NewServiceScreen full list visible
    print('4/6 NewServiceScreen list...', flush=True)
    goto(b, 'NewServiceScreen', 7)
    time.sleep(2)
    entries.append(save(b, 21,
        'Service category grid: all available trades: plumbing, electrical, AC, carpentry, painting, and more.'))

    # Screen 5: PersonalInformation
    print('5/6 PersonalInformation...', flush=True)
    goto(b, 'PersonalInformation', 6)
    entries.append(save(b, 22,
        'Personal information: professional updates name, mobile number, gender, and years of experience.'))

    # Screen 6: CustomerSignup
    print('6/6 CustomerSignup...', flush=True)
    goto(b, 'CustomerSignup', 6)
    entries.append(save(b, 23,
        'Customer sign-up: registration form with name, phone number, gender, and password fields.'))

print(f'\nCapture complete: {len(entries)} screens', flush=True)

# Only add entries that are not already in gallery
galleries = json.loads(GALLERY.read_text(encoding='utf-8'))
asaan = galleries['asaan-mazdoor']
existing_files = {e['file'] for e in asaan}
new_entries = [e for e in entries if e['file'] not in existing_files]

# Validate files are real (> 10 KB, not a browser error page)
valid = []
for e in new_entries:
    size = (PUBLIC / e['file']).stat().st_size
    if size > 10000:
        valid.append(e)
        print(f'  Valid: {e["file"]} ({round(size/1024,1)} KB)', flush=True)
    else:
        print(f'  SKIP (too small, likely error page): {e["file"]} ({round(size/1024,1)} KB)', flush=True)
        (PUBLIC / e['file']).unlink(missing_ok=True)

insert_at = len(asaan) - 1  # before original-presentation
for i, e in enumerate(valid):
    asaan.insert(insert_at + i, e)

galleries['asaan-mazdoor'] = asaan
GALLERY.write_text(json.dumps(galleries, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'Gallery updated: {len(valid)} added, total = {len(asaan)}.', flush=True)
