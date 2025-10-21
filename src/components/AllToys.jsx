// import { useEffect, useState } from 'react';
import '../styles.css'

export default function AllToys() {
    
    const categoryName = "vibrator";

fetch("http://localhost:5000/toys")
  .then(res => res.json())
  .then(data => {
    const filtered = data.filter(toy => toy.categories.includes(categoryName));
    console.log(filtered); // all toys that belong to 'vibrator'
  });
    return (
        <div className="toys-grid">
          
        </div>
    )
}