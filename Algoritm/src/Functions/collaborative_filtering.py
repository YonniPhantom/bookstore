import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, List

def item_based_collaborative_filtering(user_ratings: Dict[int, Dict[int, float]], target_user: int, top_n: int = 5) -> List[int]:
    # Crear una matriz de calificaciones de usuarios y libros
    user_ids = list(user_ratings.keys())
    book_ids = list({book_id for ratings in user_ratings.values() for book_id in ratings.keys()})
    
    user_index = {user_id: idx for idx, user_id in enumerate(user_ids)}
    book_index = {book_id: idx for idx, book_id in enumerate(book_ids)}
    
    rating_matrix = np.zeros((len(user_ids), len(book_ids)))
    for user_id, ratings in user_ratings.items():
        for book_id, rating in ratings.items():
            rating_matrix[user_index[user_id], book_index[book_id]] = rating
    
    # Calcular la similitud del coseno entre libros
    similarity_matrix = cosine_similarity(rating_matrix.T)
    
    # Obtener calificaciones del usuario objetivo
    user_rated_books = np.where(rating_matrix[user_index[target_user]] > 0)[0]
    
    recommendations = {}
    for book_id in user_rated_books:
        similar_books = list(enumerate(similarity_matrix[book_id]))
        similar_books = sorted(similar_books, key=lambda x: x[1], reverse=True)
        
        for sim_book_id, sim_score in similar_books:
            if sim_book_id not in user_rated_books:
                if sim_book_id in recommendations:
                    recommendations[sim_book_id] += sim_score
                else:
                    recommendations[sim_book_id] = sim_score
    
    recommended_books = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)[:top_n]
    return [book_ids[book_id] for book_id, _ in recommended_books]