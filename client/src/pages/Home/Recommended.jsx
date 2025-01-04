import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import BookCard from '../books/BookCard';

function Recommended() {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        fetch("books.json")
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            setBooks(data);
        })
        .catch((err)=> console.error(err))
},[])

  return (
    <>
      <div className='py-16'>
        <h1 className="text-3xl font-semibold mb-6">Recommended For You</h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {books.length > 0 &&
            books.slice(8,18).map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export default Recommended
