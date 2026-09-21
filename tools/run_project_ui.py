"""Run original Gradio interfaces on separate local ports for real UI captures."""
import importlib.util
import inspect
import os
import sys
from pathlib import Path
root=Path(__file__).resolve().parents[2]
project=sys.argv[1]
file,port = {
    'fire': (root/'fire_smoke_detection_gui_delivery/delivery/app.py',7861),
    'grocery': (root/'grocery_items_client_delivery/client_delivery/code/gradio_inference_app.py',7862),
}[project]
os.chdir(file.parent)
spec=importlib.util.spec_from_file_location('original_project_app',file)
module=importlib.util.module_from_spec(spec)
sys.modules[spec.name]=module
spec.loader.exec_module(module)
if project == 'fire' and 'show_download_button' not in inspect.signature(module.gr.Video.__init__).parameters:
    # The installed Gradio release predates this display-only constructor option.
    original_video_init=module.gr.Video.__init__
    def compatible_video_init(self,*args,**kwargs):
        kwargs.pop('show_download_button',None)
        return original_video_init(self,*args,**kwargs)
    module.gr.Video.__init__=compatible_video_init
app = module.APP if hasattr(module,'APP') else module.build_app()
app.launch(server_name='127.0.0.1',server_port=port,share=False)
