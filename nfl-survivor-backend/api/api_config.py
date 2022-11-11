import os
from dotenv import dotenv_values

config = {
    "api_config": {
        "dev": {**dotenv_values("../.env.development")},
        "prod": {**dotenv_values("../.env.production")},
        **os.environ,
    }
    # **os.environ
}
