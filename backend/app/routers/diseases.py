from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/diseases", tags=["Болезни"])


@router.get("", response_model=list[schemas.DiseaseRead])
def read_diseases(db: Session = Depends(get_db)):
    return crud.get_diseases(db)


@router.get("/{disease_id}", response_model=schemas.DiseaseRead)
def read_disease(disease_id: int, db: Session = Depends(get_db)):
    disease = crud.get_disease(db, disease_id)
    if disease is None:
        raise HTTPException(status_code=404, detail="Болезнь не найдена")
    return disease


@router.post("", response_model=schemas.DiseaseRead, status_code=status.HTTP_201_CREATED)
def add_disease(data: schemas.DiseaseCreate, db: Session = Depends(get_db)):
    # нельзя добавить болезнь растению, которого нет
    if crud.get_plant(db, data.plant_id) is None:
        raise HTTPException(status_code=404, detail="Растение не найдено")
    return crud.create_disease(db, data)


@router.put("/{disease_id}", response_model=schemas.DiseaseRead)
def edit_disease(disease_id: int, data: schemas.DiseaseCreate, db: Session = Depends(get_db)):
    disease = crud.get_disease(db, disease_id)
    if disease is None:
        raise HTTPException(status_code=404, detail="Болезнь не найдена")
    if crud.get_plant(db, data.plant_id) is None:
        raise HTTPException(status_code=404, detail="Растение не найдено")
    return crud.update_disease(db, disease, data)


@router.delete("/{disease_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_disease(disease_id: int, db: Session = Depends(get_db)):
    disease = crud.get_disease(db, disease_id)
    if disease is None:
        raise HTTPException(status_code=404, detail="Болезнь не найдена")
    crud.delete_disease(db, disease)
