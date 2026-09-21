import json
import os

base_dir = r'c:\Users\Laptop\Desktop\Porfolio\tayyab-tufail-portfolio'

urls_file = os.path.join(base_dir, 'tools', 'project_repo_urls.json')
projects_file = os.path.join(base_dir, 'website', 'lib', 'projects.ts')

with open(urls_file, 'r', encoding='utf-8') as f:
    urls = json.load(f)

with open(projects_file, 'r', encoding='utf-8') as f:
    content = f.read()

if 'githubUrl?:string;' not in content:
    content = content.replace('export type Project = {id:string;', 'export type Project = {id:string;githubUrl?:string;')

for pid, url in urls.items():
    target = f'"id": "{pid}",'
    if f'"githubUrl": "{url}"' not in content:
        replacement = f'"id": "{pid}",\n    "githubUrl": "{url}",'
        content = content.replace(target, replacement)

with open(projects_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully added githubUrl to projects.ts!')
