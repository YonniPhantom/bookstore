from pydantic import BaseModel
from typing import List, Dict

class Book(BaseModel):
    gbook_id: str
    escritor: str
    titulo: str
    categoria: str
    genero: str

class ReadBook(BaseModel):
    gbook_id: str
    rating: float

class UserPreferences(BaseModel):
    leidos: List[ReadBook]
    escritores: List[str]
    categoria: List[str]
    genero: List[str]
    tags: List[str]