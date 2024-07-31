from typing import List, Dict
from Models.models import Book

def recommend_by_genre(user_genres: List[str], books: List[Book]) -> List[Dict[str, str]]:
    recommended_books = [book.dict() for book in books if book.genero in user_genres]
    return recommended_books

def recommend_by_author(user_authors: List[str], books: List[Book]) -> List[Dict[str, str]]:
    recommended_books = [book.dict() for book in books if book.escritor in user_authors]
    return recommended_books

def recommend_by_rating(user_ratings: Dict[int, Dict[str, float]], target_user: int, books: List[Book], top_n: int) -> List[Dict[str, str]]:
    import numpy as np
    from sklearn.decomposition import NMF
    from sklearn.metrics.pairwise import cosine_similarity
    
    unique_books = {book.gbook_id: book for book in books}
    book_ids = list(unique_books.keys())
    user_ids = list(user_ratings.keys())

    rating_matrix = np.zeros((len(user_ids), len(book_ids)))

    user_idx_map = {user_id: idx for idx, user_id in enumerate(user_ids)}
    book_idx_map = {book_id: idx for idx, book_id in enumerate(book_ids)}

    for user_id, ratings in user_ratings.items():
        for book_id, rating in ratings.items():
            if book_id in book_idx_map:
                rating_matrix[user_idx_map[user_id], book_idx_map[book_id]] = rating

    nmf = NMF(n_components=5)
    user_factors = nmf.fit_transform(rating_matrix)
    item_factors = nmf.components_

    target_user_idx = user_idx_map[target_user]
    user_ratings = np.dot(user_factors[target_user_idx], item_factors)
    similarity_scores = cosine_similarity([user_ratings], rating_matrix)[0]
    top_indices = similarity_scores.argsort()[-top_n:][::-1]

    recommended_books = [unique_books[book_ids[idx]] for idx in top_indices]
    return [book.dict() for book in recommended_books]