"""Copy existing exports and select original routes without altering screen code."""
import shutil
from pathlib import Path
root=Path(__file__).resolve().parents[1]
food=root/'.capture-food-export'
if not food.exists(): shutil.copytree(root.parent/'Food/Food/web-build',food)
entries=[(food/'static/js/main.a321cbc0.js','Welcome'),(root/'.capture-social-export/_expo/static/js/web/AppEntry-523c52482dd3b85490270890c15e517f.js','Login')]
for path,default in entries:
 text=path.read_text(encoding='utf-8')
 original=f'initialRouteName:"{default}"'
 replacement=f'initialRouteName:(new URLSearchParams(window.location.search).get("screen")||"{default}")'
 if replacement in text: continue
 count=text.count(original)
 if count!=1: raise RuntimeError(f'{path}: expected one starting-route setting, found {count}')
 path.write_text(text.replace(original,replacement),encoding='utf-8')
 print(path.name, 'original route selector enabled')
