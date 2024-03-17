import { Button } from 'flowbite-react'
import { set } from 'mongoose';
import React, { useState , useEffect} from 'react'


const data= [
    'https://cdn.dribbble.com/userupload/6114818/file/original-46d8c5b0a273ee5d981d333f2b8f77bb.jpg?resize=1200x900',
    'https://images.unsplash.com/photo-1491309055486-24ae511c15c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8',
    'https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?s=2048x2048&w=is&k=20&c=Zjje0BxGxG97T_ezdwvrsrJ9e01fgdwt7nVAZysQtTE=',
]


export default function ImageSlider() {
 

    const [activeImageIndex, setActiveImageIndex]= useState(0);

   


    const handlePreviosClick= ()=>{
        if (activeImageIndex===0){
            setActiveImageIndex(data.length - 1);
        }
        else{
            setActiveImageIndex(activeImageIndex - 1)
        }
       


    }

    const handleNextClick = ()=> {
        if (activeImageIndex=== data.length-1){
            setActiveImageIndex(0)
        }
        else{
            setActiveImageIndex(activeImageIndex + 1);
        }
        

    }

    useEffect(()=> {
        
            const timer = setTimeout(() => {
                handleNextClick();
            },3000);
            return() =>{
                clearTimeout(timer);
            };
      
       
    },[activeImageIndex])
  return (
    <div className='flex justify-center '> 
     
       <img src={data[activeImageIndex]} className='w-[700px] object-contain'></img>
      

      

    </div>
  )
}
