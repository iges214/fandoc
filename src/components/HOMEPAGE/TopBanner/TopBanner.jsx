import { useEffect, useState } from "react"
import "./TopBanner.css"

export default function TopBanner() {
const [currentSlide, setCurrentSlide] = useState(0);

const slides =[
  {
    id:1,
    content: (
    <>
      <span className="websitename">FantasyDoctor</span>
      <span className="promo-text">--we deliver discretely🤫--</span>
    </>
    )
  },
   {
    id:2,
    content: (
    <>
      <span className="websitename">FantasyDoctor</span>
      <span className="promo-text">--you dont't need to register before you order😉--</span>
    </>
    )
  }
];

useEffect(()=>{
  const interval = setInterval(()=>{
    setCurrentSlide((prevSlide)=>(prevSlide + 1)% slides.length);
  }, 4000); //change slide every 4 seconds

  return() => {
    clearInterval(interval);
  };
},[slides.length]);

const handleSlideClick = (index)=>{
  setCurrentSlide(index);
}

  return(
    <>
    <nav className="top-banner-container">
      <div className="top-banner">
        {slides.map((slide, index)=>(
          <div key={slide.id} className={`slide ${index === currentSlide? 'active' : ''}`}>
            {slide.content}
          </div>
        ))}
      </div>
      <div className="dots-container">
        {slides.map((_, index)=>(
          <div key={index} className={`indicator ${index === currentSlide ? "active" : ""}`}
          onClick={()=> handleSlideClick(index)}></div>
        )
        )}

      </div>
    </nav>
    </>

)}