"""Capture 6 additional real Asaan Mazdoor screens (ui-18 to ui-23) from the live export."""
import json, time, shutil
from pathlib import Path
from browser_capture import Browser, ROOT

PUBLIC  = ROOT / 'website/public/images'
GALLERY = ROOT / 'website/lib/project-galleries.json'

# ─── helpers ────────────────────────────────────────────────────────────────
def goto(b, screen, wait=5):
    b.goto(f'http://127.0.0.1:8089/?screen={screen}', wait)

def scroll(b, px):
    b.evaluate(f'window.scrollBy(0, {px})')
    time.sleep(1)

def save(b, num, caption):
    fname = f'asaan-mazdoor-ui-{num:02d}.png'
    b.screenshot(ROOT / 'assets/images' / fname)
    shutil.copy2(str(ROOT / 'assets/images' / fname), str(PUBLIC / fname))
    print(f'  OK {fname}', flush=True)
    return {'file': fname, 'caption': caption}

# ─── capture ────────────────────────────────────────────────────────────────
entries = []
with Browser(430, 900, 9241) as b:

    # 1: PostJobScreen top half (title, description, category picker)
    print('Capturing PostJobScreen top...', flush=True)
    goto(b, 'PostJobScreen', 6)
    entries.append(save(b, 18,
        'Job posting form: title, description, and service category selection fields.'))

    # 2: PostJobScreen scrolled to show location, images, payment, submit button
    print('Capturing PostJobScreen scrolled...', flush=True)
    scroll(b, 900)
    entries.append(save(b, 19,
        'Job posting continued: location, optional photo upload, payment method, and Post Job button.'))

    # 3: TermsAndConditions scrolled to show body text
    print('Capturing TermsAndConditions body...', flush=True)
    goto(b, 'TermsAndConditions', 5)
    scroll(b, 500)
    entries.append(save(b, 20,
        'Terms and conditions text: user account responsibilities, prohibited conduct, and IP rights.'))

    # 4: NewServiceScreen with "Electrician" search
    print('Capturing NewServiceScreen Electrician search...', flush=True)
    goto(b, 'NewServiceScreen', 5)
    b.evaluate("document.querySelector('input').focus()")
    time.sleep(0.5)
    b.call('Input.insertText', {'text': 'Electr'})
    time.sleep(2)
    entries.append(save(b, 21,
        'Service search: filtering categories by "Electrician" to find electrician services.'))

    # 5: PersonalInformation form (professional profile edit)
    print('Capturing PersonalInformation...', flush=True)
    goto(b, 'PersonalInformation', 5)
    entries.append(save(b, 22,
        'Personal information form: professional updates full name, mobile, gender, and experience.'))

    # 6: CustomerSignup full form
    print('Capturing CustomerSignup full form...', flush=True)
    goto(b, 'CustomerSignup', 5)
    entries.append(save(b, 23,
        'Customer sign-up form: full registration with name, phone, gender, and password fields.'))

# ─── update gallery ─────────────────────────────────────────────────────────
galleries = json.loads(GALLERY.read_text(encoding='utf-8'))
asaan = galleries['asaan-mazdoor']

# Insert before original-presentation (last item)
insert_at = len(asaan) - 1
for i, e in enumerate(entries):
    asaan.insert(insert_at + i, e)

galleries['asaan-mazdoor'] = asaan
GALLERY.write_text(json.dumps(galleries, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'\nDone: added {len(entries)} images. Gallery now has {len(asaan)} images.', flush=True)
