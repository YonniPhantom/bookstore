import React from 'react';
import './BookCard.css';

const BookCard = ({ title, genre, rating }) => (
  <div className="card">
    <div className="image-placeholder">150 x 150</div>
    <h3>{title}</h3>
    <p>{genre}</p>
    <div className="rating">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "filled-star" : "empty-star"}>★</span>
      ))}
    </div>
    <div className="like-icon">♡</div>
  </div>
);

export default BookCard;







