from typing import List, Dict

def recommend_books(user_preferences: List[str], books: List[Dict[str, str]]) -> List[Dict[str, str]]:
    recommended_books = [book for book in books if book['genre'] in user_preferences]
    return recommended_books