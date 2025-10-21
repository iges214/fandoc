import { useState, useEffect } from 'react';
import './CenterLayout.css';

export default function CenterLayout () {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use absolute paths from public folder
  const images = [
    "/images/19.jpg",
    "/images/201.jpg",
    "/images/fantasydoctorLogo.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className='center-layout'>
      <div className="slideshow-container">
        <div className="slides-wrapper">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? 'active' : ''} ${
                index === currentIndex - 1 || 
                (currentIndex === 0 && index === images.length - 1) 
                  ? 'previous' 
                  : ''
              }`}
            >
              <img 
                src={image} 
                alt={`Slide ${index + 1}`}
                className="slide-image"
                onError={(e) => {
                  console.error('Failed to load image:', image);
                  e.target.src = "https://via.placeholder.com/800x400/800083/FFFFFF?text=Image+Not+Found";
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <button className="nav-btn prev-btn" onClick={prevSlide}>
          ‹
        </button>
        <button className="nav-btn next-btn" onClick={nextSlide}>
          ›
        </button>
        
        {/* Dots indicator */}
        <div className="dots-container">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};




