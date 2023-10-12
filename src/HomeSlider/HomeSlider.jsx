import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
export default function HomeSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <>
      <div>
        <Slider {...settings}>
          <div>
            <img style={{width:"100%" , height: '300px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt='slider'/>
          </div>
          <div>
            <img style={{width:"100%" , height: '300px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt='slider'/>
          </div>
          <div>
            <img style={{width:"100%" , height: '300px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt='slider'/>
          </div>
          <div>
            <img style={{width:"100%" , height: '300px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt='slider'/>
          </div>
          <div>
            <img style={{width:"100%" , height: '300px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt='slider'/>
          </div>
          <div>
            <img style={{width:"100%" , height: '300px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt='slider'/>
          </div>
        </Slider>
      </div>
  
  </>
}
