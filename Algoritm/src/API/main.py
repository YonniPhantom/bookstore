from fastapi import FastAPI, Query
from typing import List, Dict
from pydantic import BaseModel
from Models.models import Book, UserPreferences, ReadBook
from Functions.recommendation import recommend_by_genre, recommend_by_author, recommend_by_rating

app = FastAPI()

class GenreRequest(BaseModel):
    usuario: UserPreferences
    google: List[Book]

class AuthorRequest(BaseModel):
    usuario: UserPreferences
    google: List[Book]

class RatingRequest(BaseModel):
    usuario: UserPreferences
    google: List[Book]

@app.post("/recommend-by-genre")
def recommend_by_genre_endpoint(request: GenreRequest):
    user_genres = request.usuario.genero
    books = request.google
    recommendations = recommend_by_genre(user_genres, books)
    return {"recommendations": recommendations}

@app.post("/recommend-by-author")
def recommend_by_author_endpoint(request: AuthorRequest):
    user_authors = request.usuario.escritores
    books = request.google
    recommendations = recommend_by_author(user_authors, books)
    return {"recommendations": recommendations}

@app.post("/recommend-by-rating")
def recommend_by_rating_endpoint(request: RatingRequest, target_user: int = Query(...), top_n: int = Query(...)):
    user_ratings = {idx: {leido.gbook_id: leido.rating for leido in request.usuario.leidos} for idx, _ in enumerate(request.usuario.leidos)}
    books = request.google
    recommendations = recommend_by_rating(user_ratings, target_user, books, top_n)
    return {"recommendations": recommendations}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)