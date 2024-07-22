from pydantic import BaseModel
from typing import List, Dict

class Book(BaseModel):
    id: int
    title: str
    author: str
    genre: str

class UserPreferences(BaseModel):
    preferences: List[str]

class UserRatings(BaseModel):
    user_ratings: Dict[int, Dict[int, float]]
    target_user: int
    top_n: int

class ContentRecommendationRequest(BaseModel):
    user_preferences: UserPreferences
    top_n: int

class MatrixFactorizationRequest(BaseModel):
    user_ratings: Dict[int, Dict[int, float]]
    target_user: int
    top_n: int