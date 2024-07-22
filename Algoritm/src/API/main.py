from fastapi import FastAPI, HTTPException
from typing import List
from Models.models import Book, UserPreferences, UserRatings, ContentRecommendationRequest, MatrixFactorizationRequest
from Functions.recommendation import recommend_books
from Functions.collaborative_filtering import item_based_collaborative_filtering
from Functions.content_based import content_based_filtering
from Functions.matrix_factorization import matrix_factorization
import json
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BOOKS_FILE = os.path.join(BASE_DIR, '../Data/books.json')

def load_books():
    if not os.path.exists(BOOKS_FILE):
        return []
    with open(BOOKS_FILE, 'r') as file:
        return json.load(file)

def save_books(books):
    with open(BOOKS_FILE, 'w') as file:
        json.dump(books, file, indent=4)

@app.post("/update-books")
def update_books(books: List[Book]):
    try:
        books_data = [book.dict() for book in books]
        save_books(books_data)
        return {"message": "Books updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend")
def get_recommendations(user_preferences: UserPreferences):
    try:
        books = load_books()
        recommendations = recommend_books(user_preferences.preferences, books)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/collaborative-recommend")
def collaborative_recommend(request: UserRatings):
    try:
        user_ratings = request.user_ratings
        target_user = request.target_user
        top_n = request.top_n

        books = load_books()
        book_dict = {book['id']: book for book in books}
        recommendations = item_based_collaborative_filtering(user_ratings, target_user, top_n)
        recommended_books = [book_dict[book_id] for book_id in recommendations if book_id in book_dict]

        return recommended_books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/content-recommend")
def content_recommend(request: ContentRecommendationRequest):
    try:
        user_preferences = request.user_preferences.preferences
        top_n = request.top_n

        books = load_books()
        recommendations = content_based_filtering(user_preferences, books, top_n)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/matrix-recommend")
def matrix_recommend(request: MatrixFactorizationRequest):
    try:
        user_ratings = request.user_ratings
        target_user = request.target_user
        top_n = request.top_n

        books = load_books()
        recommendations = matrix_factorization(user_ratings, target_user, top_n)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)