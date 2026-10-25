from sqlalchemy.orm import Session

from . import models, schemas


# растения
def get_plants(db: Session):
    return db.query(models.Plant).order_by(models.Plant.id).all()


def get_plant(db: Session, plant_id: int):
    return db.query(models.Plant).filter(models.Plant.id == plant_id).first()


def get_plant_by_name(db: Session, name: str):
    return db.query(models.Plant).filter(models.Plant.name == name).first()


def create_plant(db: Session, data: schemas.PlantCreate):
    plant = models.Plant(name=data.name)
    db.add(plant)
    db.commit()
    db.refresh(plant)
    return plant


def update_plant(db: Session, plant: models.Plant, data: schemas.PlantCreate):
    plant.name = data.name
    db.commit()
    db.refresh(plant)
    return plant


def delete_plant(db: Session, plant: models.Plant):
    db.delete(plant)
    db.commit()


# болезни
def get_diseases(db: Session):
    return db.query(models.Disease).order_by(models.Disease.id).all()


def get_disease(db: Session, disease_id: int):
    return db.query(models.Disease).filter(models.Disease.id == disease_id).first()


def create_disease(db: Session, data: schemas.DiseaseCreate):
    disease = models.Disease(**data.model_dump())
    db.add(disease)
    db.commit()
    db.refresh(disease)
    return disease


def update_disease(db: Session, disease: models.Disease, data: schemas.DiseaseCreate):
    disease.name = data.name
    disease.description = data.description
    disease.symptoms = data.symptoms
    disease.treatment = data.treatment
    disease.plant_id = data.plant_id
    db.commit()
    db.refresh(disease)
    return disease


def delete_disease(db: Session, disease: models.Disease):
    db.delete(disease)
    db.commit()
