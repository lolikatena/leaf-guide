from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/leafguide"

    class Config:
        env_file = ".env"


settings = Settings()
