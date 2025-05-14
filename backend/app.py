from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
import json
import logging
from opentelemetry.instrumentation.flask import FlaskInstrumentor

load_dotenv()

from apis import init_app as init_api

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('boilerplate')

app = Flask(__name__)
CORS(app)

try:
    firebase_cred = json.loads(os.getenv('FIREBASE_SERVICE_ACCOUNT'))
    cred = credentials.Certificate(firebase_cred)
    firebase_admin.initialize_app(cred)
    logger.info('Firebase Admin SDK initialized successfully')
except Exception as e:
    logger.error(f'Failed to initialize Firebase Admin SDK: {str(e)}')
    raise

# Configure Azure Application Insights in production
if os.environ.get('FLASK_ENV') != 'development':
    try:
        from azure.monitor.opentelemetry import configure_azure_monitor
        configure_azure_monitor(
            connection_string=os.environ.get('APPLICATIONINSIGHTS_CONNECTION_STRING'),
            logger_name='boilerplate'
        )
        FlaskInstrumentor().instrument_app(app)
        logger.info('Azure Application Insights configured successfully')
    except Exception as e:
        logger.error(f'Failed to configure Azure Application Insights: {str(e)}')
        raise

init_api(app)

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    logger.info(f'Starting Flask application in {"debug" if debug_mode else "production"} mode')
    app.run(debug=debug_mode) 