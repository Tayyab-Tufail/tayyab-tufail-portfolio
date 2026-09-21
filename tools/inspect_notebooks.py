import json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
for file in (root/'toxic_behaviour_classify').rglob('*.ipynb'):
    notebook=json.loads(file.read_text(encoding='utf-8'))
    print(file.relative_to(root))
    for i,cell in enumerate(notebook['cells']):
        outputs=cell.get('outputs',[])
        pictures=sum('image/png' in o.get('data',{}) for o in outputs)
        if pictures:
            print(json.dumps({'cell':i,'images':pictures,'code':''.join(cell.get('source',[]))[:1100]}))
