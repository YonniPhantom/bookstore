import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = () => {
  const recommendations = [
    { title: 'El señor de los anillos', genre: 'Fantasía, Aventura', rating: 4 },
    { title: '1984', genre: 'Distopía, Ciencia Ficción', rating: 4 },
    { title: 'Harry Potter', genre: 'Fantasía, Aventura', rating: 5 },
    { title: 'El Hobbit', genre: 'Fantasía, Aventura', rating: 4 },
    { title: 'Dune', genre: 'Ciencia Ficción, Aventura', rating: 5 },
  ];

  const suggestions = [
    { title: 'Drácula', genre: 'Terror, Gótico', rating: 4 },
    { title: 'Frankenstein', genre: 'Terror, Ciencia Ficción', rating: 4 },
    { title: 'El exorcista', genre: 'Terror', rating: 5 },
    { title: 'It', genre: 'Terror', rating: 4 },
    { title: 'El resplandor', genre: 'Terror, Suspenso', rating: 5 },
  ];

  return (
    <div className="book-list">
      <div className="section">
        <h2>Según tus gustos:</h2>
        <div className="category-tabs">
          <button>Acción</button>
          <button className="active">Terror</button>
          <button>Suspenso</button>
          <button>Romance</button>
          <button>Historia</button>
        </div>
        <div className="cards-container">
          {recommendations.map((rec, index) => (
            <BookCard key={index} {...rec} />
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Podrían gustarte:</h2>
        <div className="cards-container">
          {suggestions.map((rec, index) => (
            <BookCard key={index} {...rec} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;



