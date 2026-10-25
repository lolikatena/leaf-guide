# заполняет базу заглушками, запускать из папки backend: python seed.py
from app import models
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

names = ["Томат", "Картофель", "Огурец", "Яблоня", "Виноград", "Роза"]

db = SessionLocal()

for name in names:
    # не добавляем второй раз, если растение уже есть
    if db.query(models.Plant).filter(models.Plant.name == name).first():
        continue

    plant = models.Plant(name=name)
    db.add(plant)
    db.commit()
    db.refresh(plant)

    for number in range(1, 4):
        db.add(
            models.Disease(
                name=f"Болезнь {number}",
                description=f"Описание болезни {number}",
                symptoms=f"Симптомы {number}",
                treatment=f"Лечение {number}",
                plant_id=plant.id,
            )
        )

db.commit()
db.close()

print("готово, база заполнена")
