"""Capture original mobile components. Query-selected routes are preview-only."""
import json
import time
import sys
from browser_capture import Browser, ROOT

sets = {
 'asaan-mazdoor': (8089, [
  ('Welcome','Welcome and introduction'), ('Select','Customer / professional role selection'),
  ('CustomerLogin','Customer sign-in'), ('ProfessionalLogin','Professional sign-in'),
  ('CustomerSignup','Customer registration'), ('ProfessionalSignup','Professional registration'),
  ('Login','General sign-in'), ('Signup','General registration'), ('ForgotPassword','Password recovery'),
  ('ChangePassword','Change password form'), ('NewServiceScreen','Service category selection'),
  ('SubService','AC service options'), ('PersonalInformation','Personal information form'),
  ('PostJobScreen','Create a job form'), ('TermsAndConditions','Terms and conditions'),
 ]),
 'food-app': (8087, [('Welcome','Welcome'),('Menu','Menu and search'),('Cart','Shopping cart'),('Settings','Settings'),('Invitation','Invitation'),('Signup','Sign up'),('Login','Sign in')]),
 'cybershield': (8088, [('Welcome','Welcome'),('Login','Sign in'),('Register','Registration'),('ForgotPassword','Password recovery'),('Chat','Chat list'),('Notifications','Notifications'),('Friends','Friends'),('Add','Create post')]),
}
project=sys.argv[1]
port,screens=sets[project]
manifest=[]
with Browser(430,1000,9234) as browser:
 for index,(route,label) in enumerate(screens):
  browser.goto(f'http://127.0.0.1:{port}/?screen={route}',5)
  body=browser.text()
  if not body.strip() or 'Uncaught Error' in body or 'Something went wrong' in body:
   print(json.dumps({'screen':route,'error':body[:400]}),flush=True)
   continue
  file=f'{project}-ui-{index+1:02d}.png'
  browser.screenshot(ROOT/'assets/images'/file)
  manifest.append({'file':file,'caption':f'{label}: original screen rendered in a local web preview.','route':route,'kind':'original-component-preview','project':project,'body':body[:1600]})
  (ROOT/f'assets/{project}-expanded-manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False),encoding='utf-8')
  print(json.dumps({'file':file,'text':body[:80]}),flush=True)
