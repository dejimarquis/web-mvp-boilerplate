from flask import Blueprint, jsonify, request
from azure.cosmos.exceptions import CosmosResourceNotFoundError
import logging
from .auth import auth_required
from services.cosmos import db

# Create the main API blueprint
api_bp = Blueprint('api', __name__)

# Import all route modules to register them with the blueprint
from . import auth
from . import users

logger = logging.getLogger('boilerplate')

def init_app(app):
    app.register_blueprint(api_bp)
    register_error_handlers(app)

def register_error_handlers(app):
    @app.errorhandler(CosmosResourceNotFoundError)
    def handle_cosmos_not_found(error):
        logger.warning(f'Cosmos resource not found: {str(error)}')
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(Exception)
    def handle_generic_exception(error):
        logger.error(f'Unhandled exception: {str(error)}')
        return jsonify({'error': 'Internal server error'}), 500 

# Global API routes
@api_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({'status': 'healthy'}), 200 