import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../services/api';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails(id).then(setBook);
  }, [id]);

  if (!book) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="book-detail-page">
      <img src={book.cover} alt={book.title} />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Género: {book.genre}</p>
      <p>Calificación: {book.rating}</p>
    </div>
  );
};

export default BookDetailPage;

