import os


def register_blueprints(app):
	blueprints_dir = os.path.dirname(__file__)
	for filename in os.listdir(blueprints_dir):
		if filename.endswith('.py') and filename != '__init__.py':
			module_name = filename[:-3]  # Strip '.py'
			module = __import__(f'project.code.blueprints.{module_name}', fromlist=[module_name])
			blueprint = getattr(module, f'{module_name}_bp', None)
			if blueprint:
				app.register_blueprint(blueprint, url_prefix=f'/{module_name}')
