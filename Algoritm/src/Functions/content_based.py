import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

def content_based_filtering(user_preferences: List[str], books: List[Dict[str, str]], top_n: int = 5) -> List[Dict[str, str]]:
    # Crear una lista de descripciones de libros para el vectorizador
    descriptions = ["{} {}".format(book['author'], book['genre']) for book in books]
    
    # Vectorizar las descripciones
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(descriptions)
    
    # Crear una descripción basada en las preferencias del usuario
    user_description = " ".join(user_preferences)
    user_vector = vectorizer.transform([user_description])
    
    # Calcular la similitud del coseno entre la descripción del usuario y los libros
    cosine_similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()
    
    # Obtener los índices de los libros más similares
    similar_indices = cosine_similarities.argsort()[-top_n:][::-1]
    
    # Devolver los libros más similares
    recommended_books = [books[i] for i in similar_indices]
    return recommended_books