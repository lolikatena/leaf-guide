from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


#асинхронно ыло бы лучше
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/plants", tags=["Растения"])


@router.get("", response_model=list[schemas.PlantRead])
def read_plants(db: Session = Depends(get_db)):
    return crud.get_plants(db)


@router.get("/{plant_id}", response_model=schemas.PlantWithDiseases)
def read_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = crud.get_plant(db, plant_id)
    if plant is None:
        raise HTTPException(status_code=404, detail="Растение не найдено")
    return plant


@router.post("", response_model=schemas.PlantRead, status_code=status.HTTP_201_CREATED)
def add_plant(data: schemas.PlantCreate, db: Session = Depends(get_db)):
    # имена растений не должны повторяться
    if crud.get_plant_by_name(db, data.name):
        raise HTTPException(status_code=400, detail="Такое растение уже есть")
    return crud.create_plant(db, data)


@router.put("/{plant_id}", response_model=schemas.PlantRead)
def edit_plant(plant_id: int, data: schemas.PlantCreate, db: Session = Depends(get_db)):
    plant = crud.get_plant(db, plant_id)
    if plant is None:
        raise HTTPException(status_code=404, detail="Растение не найдено")
    return crud.update_plant(db, plant, data)


@router.delete("/{plant_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = crud.get_plant(db, plant_id)
    if plant is None:
        raise HTTPException(status_code=404, detail="Растение не найдено")
    # болезни этого растения удалятся вместе с ним
    crud.delete_plant(db, plant)
