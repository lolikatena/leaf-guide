from pydantic import BaseModel, Field


# схемы для болезни
class DiseaseBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    description: str = ""
    symptoms: str = ""
    treatment: str = ""


# что присылают при создании болезни
class DiseaseCreate(DiseaseBase):
    plant_id: int


# что отдаём в ответе
class DiseaseRead(DiseaseBase):
    id: int
    plant_id: int

    # разрешает собирать схему из объекта sqlalchemy
    model_config = {"from_attributes": True}


# схемы для растения
class PlantBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class PlantCreate(PlantBase):
    pass


class PlantRead(PlantBase):
    id: int

    model_config = {"from_attributes": True}


# растение вместе со списком его болезней
class PlantWithDiseases(PlantRead):
    diseases: list[DiseaseRead] = []
