from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from .database import Base


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)

    # одно растение - много болезней, cascade удаляет болезни вместе с растением
    diseases = relationship("Disease", back_populates="plant", cascade="all, delete-orphan")


class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False, default="")
    symptoms = Column(Text, nullable=False, default="")
    treatment = Column(Text, nullable=False, default="")

    # внешний ключ на таблицу растений
    plant_id = Column(Integer, ForeignKey("plants.id", ondelete="CASCADE"), nullable=False)

    plant = relationship("Plant", back_populates="diseases")
