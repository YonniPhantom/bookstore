import numpy as np
from scipy.sparse.linalg import svds
from typing import Dict, List

def matrix_factorization(user_ratings: Dict[int, Dict[int, float]], target_user: int, top_n: int) -> List[int]:
    # Crear un mapa de índices a IDs
    user_indices = {user_id: index for index, user_id in enumerate(user_ratings.keys())}
    book_indices = {book_id: index for index, book_id in enumerate({book_id for ratings in user_ratings.values() for book_id in ratings.keys()})}
    
    # Crear la matriz de utilidad
    num_users = len(user_indices)
    num_books = len(book_indices)
    utility_matrix = np.zeros((num_users, num_books))
    
    for user_id, ratings in user_ratings.items():
        for book_id, rating in ratings.items():
            utility_matrix[user_indices[user_id], book_indices[book_id]] = rating
            
    # Realizar la descomposición en valores singulares (SVD)
    U, sigma, Vt = svds(utility_matrix, k=min(len(user_indices)-1, len(book_indices)-1))
    sigma = np.diag(sigma)
    
    # Predecir las calificaciones
    predicted_ratings = np.dot(np.dot(U, sigma), Vt)
    
    # Obtener los índices de los libros no vistos por el usuario objetivo
    user_index = user_indices[target_user]
    seen_books = set(user_ratings[target_user].keys())
    unseen_books = [i for i in range(num_books) if i not in seen_books]
    
    # Obtener las calificaciones previstas para los libros no vistos
    predicted_ratings_user = predicted_ratings[user_index, unseen_books]
    
    # Obtener los índices de los libros mejor calificados
    recommended_indices = np.argsort(predicted_ratings_user)[-top_n:][::-1]
    
    # Mapear de vuelta a los IDs de los libros
    index_to_book_id = {index: book_id for book_id, index in book_indices.items()}
    recommended_books = [index_to_book_id[i] for i in recommended_indices]
    
    return recommended_books