import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../css/carouselCSS.css';

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="panel-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={require('../../images/sliders/ao-thun-.jpg')}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={require('../../images/sliders/panel-lap.jpg')}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={require('../../images/sliders/slider1.png')}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;