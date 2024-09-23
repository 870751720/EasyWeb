import importlib
import os

def import_all_files_in_module():
	module_path = os.path.dirname(__file__)

	python_files = [f for f in os.listdir(module_path) if f.endswith('.py') and not f == '__init__.py']

	for file in python_files:
		try:
			importlib.import_module(file[:-3])
		except ImportError as e:
			pass

import_all_files_in_module()
