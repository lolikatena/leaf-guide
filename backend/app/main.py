from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routers import diseases, plants

# создаём таблицы, если их ещё нет
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Листочек API", description="Справочник по болезням растений")

# разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(plants.router)
app.include_router(diseases.router)


@app.get("/")
def root():
    return {"message": "api справочника работает, документация на /docs"}
