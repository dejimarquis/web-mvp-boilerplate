import logging
from .auth import auth_required
from flask import request, jsonify
from services.cosmos import db
from . import api_bp
from enum import Enum
from datetime import datetime
import firebase_admin
from firebase_admin import auth

logger = logging.getLogger('boilerplate')

class SubscriptionType(Enum):
    FREE = 'free'
    PAID = 'paid'
    ENTERPRISE = 'enterprise'

# User routes
@api_bp.route('/users', methods=['POST'])
@auth_required
def create_user():
    user_id = request.user['uid']
    email = request.user.get('email')
    name = request.user.get('name', '').split()
    first_name = name[0] if name else ''
    last_name = name[1] if len(name) > 1 else ''
    logger.info(f'Creating user from token: {user_id}')
    if not email:
        logger.warning(f'No email found in token for user {user_id}')
        return jsonify({'error': 'No email found in authentication token'}), 400
    
    user_data = {
        'id': user_id,
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'profileCompleted': False,
        'subscription': SubscriptionType.FREE.value,
        'createdAt': datetime.now().isoformat(),
        'updatedAt': datetime.now().isoformat()
    }
    
    db.users_container.create_item(body=user_data)
    logger.info(f'User created successfully: {user_id}')
    
    # Return only the fields we want to expose
    return jsonify(user_data), 201

@api_bp.route('/users', methods=['GET'])
@auth_required
def get_user():
    user_id = request.user['uid']
    logger.info(f'Fetching user: {user_id}')
    user = db.users_container.read_item(item=user_id, partition_key=user_id)
    
    # Only return specific fields we want in the API
    response = {
        'id': user['id'],
        'firstName': user.get('firstName', ''),
        'lastName': user.get('lastName', ''),
        'email': user.get('email', ''),
        'profileCompleted': user.get('profileCompleted', False),
        'subscription': user.get('subscription', SubscriptionType.FREE.value),
        'createdAt': user.get('createdAt', ''),
        'updatedAt': user.get('updatedAt', '')
    }
    
    return jsonify(response)

@api_bp.route('/users', methods=['PUT'])
@auth_required
def update_user():
    user_id = request.user['uid']
    data = request.json
    logger.info(f'Updating user: {user_id}')

    if not data:
        logger.warning(f'No update data provided for user {user_id}')
        return jsonify({'error': 'No update data provided'}), 400
    
    user = db.users_container.read_item(item=user_id, partition_key=user_id)
    allowed_fields = {'profileCompleted'}
    update_data = {k: v for k, v in data.items() if k in allowed_fields}
    if not update_data:
        logger.warning(f'No valid fields to update for user {user_id}')
        return jsonify({'error': 'No valid fields to update'}), 400
    
    user.update(update_data)
    user['updatedAt'] = datetime.now().isoformat()
    db.users_container.replace_item(item=user_id, body=user)
    logger.info(f'User updated successfully: {user_id}')
    
    # Return same structure as GET
    response = {
        'id': user['id'],
        'firstName': user.get('firstName', ''),
        'lastName': user.get('lastName', ''),
        'email': user.get('email', ''),
        'profileCompleted': user.get('profileCompleted', False),
        'subscription': user.get('subscription', SubscriptionType.FREE.value),
        'createdAt': user.get('createdAt', ''),
        'updatedAt': user.get('updatedAt', '')
    }
    
    return jsonify(response)

@api_bp.route('/users', methods=['DELETE'])
@auth_required
def delete_user():
    user_id = request.user['uid']
    logger.info(f'Deleting user: {user_id}')
    
    try:
        auth.delete_user(user_id)
        logger.info(f'User deleted from Firebase Auth: {user_id}')
        
        db.users_container.delete_item(item=user_id, partition_key=user_id)
        logger.info(f'User deleted from database: {user_id}')
        
        return '', 204
    except firebase_admin.exceptions.FirebaseError as e:
        logger.error(f'Firebase error deleting user {user_id}: {str(e)}')
        return jsonify({'error': f'Error deleting user from auth system: {str(e)}'}), 500
    except Exception as e:
        logger.error(f'Error deleting user {user_id}: {str(e)}')
        return jsonify({'error': f'Error deleting user: {str(e)}'}), 500 