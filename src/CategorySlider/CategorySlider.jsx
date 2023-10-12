import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { Hourglass } from 'react-loader-spinner'
export default function CategorySlider() 
{

function GetCategories() 
{
   return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
 const {data , isLoading} = useQuery(  " AllCategory"  , GetCategories , {refetchOnMount:false} );
    

 const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows : true
  };
//   console.log(data?.data.data);
        if (isLoading) 
        {
        return<>
                   <div className='text-center'>
                        <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#0aad0a', '#0aad0a']}
                        />
                   </div>

            </>    
        }


  return <>
   

   <h4 className='pb-5'>Category Slider : </h4>

        <Slider {...settings}>
                {data?.data.data.map(function (category,idx) {
                    return <div key={idx}>
                        <img style={{width:"100%" , height: '300px '}} src={category.image} alt='slider'/>
                        <h6>{category.name}</h6>
                        </div>  
                }) }
            
        </Slider>
  
  </>
}
