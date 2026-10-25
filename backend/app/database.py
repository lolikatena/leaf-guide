from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .config import settings

# engine это само подключение к postgres
engine = create_engine(settings.database_url)

# фабрика сессий, через сессию делаются все запросы
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# от Base наследуются все модели таблиц
Base = declarative_base()


# открываем сессию на один запрос и закрываем после ответа
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
