import logging
from functools import wraps
from flask import request, jsonify
import firebase_admin
from firebase_admin import auth as firebase_auth

logger = logging.getLogger('boilerplate')

def auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            logger.warning('Missing or invalid Authorization header')
            return jsonify({'error': 'Unauthorized: Missing or invalid token'}), 401
        
        token = auth_header.split('Bearer ')[1]
        try:
            decoded_token = firebase_auth.verify_id_token(token)
            request.user = decoded_token
            logger.debug(f'User authenticated: {decoded_token["uid"]}')
            return f(*args, **kwargs)
        except firebase_admin.exceptions.FirebaseError as e:
            logger.warning(f'Firebase auth error: {str(e)}')
            return jsonify({'error': 'Unauthorized: Invalid token'}), 401
        except Exception as e:
            logger.error(f'Authentication error: {str(e)}')
            return jsonify({'error': 'Server error during authentication'}), 500
    
    return decorated_function 