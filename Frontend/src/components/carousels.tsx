import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Carousels = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='carsouel__item' style={{height:'400px'}}>
        <img style={ { height: '110%'}}
          className='d-block w-full '
          src='/images/01-ottominionss.jpg'
       
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item className='carsouel__item'>
        <img
          className='d-block w-full '
          src='/imgs/banner_news.jpg'
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item className='carsouel__item' style={{height:'400px'}}>
        <img style={{height:'110%'}}
          className='d-block w-full '
          src='/imgs/webadsM139.png' 
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
