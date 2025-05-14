from azure.cosmos import CosmosClient
import os
import logging
from azure.cosmos.exceptions import CosmosHttpResponseError

logger = logging.getLogger('boilerplate')

class CosmosDB:
    def __init__(self):
        try:
            self.endpoint = os.getenv("COSMOS_ENDPOINT")
            self.key = os.getenv("COSMOS_KEY")
            self.database_name = os.getenv("COSMOS_DATABASE")
            
            if not all([self.endpoint, self.key, self.database_name]):
                raise ValueError("Missing required Cosmos DB environment variables")
                
            self.client = CosmosClient(self.endpoint, self.key)
            self.database = self.client.get_database_client(self.database_name)
            self.users_container = self.database.get_container_client("Users")
            logger.info('Cosmos DB connection initialized successfully')
        except Exception as e:
            logger.error(f'Failed to initialize Cosmos DB connection: {str(e)}')
            raise

    def get_container(self, container_name):
        try:
            return self.database.get_container_client(container_name)
        except CosmosHttpResponseError as e:
            logger.error(f'Failed to get container {container_name}: {str(e)}')
            raise
        except Exception as e:
            logger.error(f'Unexpected error getting container {container_name}: {str(e)}')
            raise

# Create a singleton instance
db = CosmosDB() 