import React, { useEffect, useState } from "react";
import BookCard from "../books/BookCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "choose a genre",
  "business",
  "fiction",
  "horror",
  "adventure",
];

function TopSellers() {
  const [selectedCategory, setSelectedCategory] = useState("choose a genre");

  const {data} = useFetchAllBooksQuery()

  const books = data?.data || []
  console.log(data?.data)
  if(!data) return <div>Loading...</div>
  // console.log(books)

  const filteredBooks = selectedCategory === "choose a genre" ? books : books.filter((book) => book.category === selectedCategory.toLowerCase());
  console.log(selectedCategory);
//   console.log(JSON.stringify(filteredBooks,null, 2));

  return (
    <>
      <div className="py-10">
        <h1 className="text-3xl font-semibold mb-6">Top Sellers</h1>
        {/* category filtering */}

        <div className="mb-8 flex items-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 outline-none border border-stone-700 rounded-md bg-[#EAEAEA]"
            name="category"
            id="category"
          >
            {categories.map((category, index) => (
              <option
                className="bg-white hover:bg-stone-400"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
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
            1180:{
                slidesPerView: 3,
                spaceBetween: 50,
            }
          }}
          modules={[Pagination,Navigation]}
          className="mySwiper"
        >
          {filteredBooks.length>0 &&  filteredBooks.map((book) => (
          <SwiperSlide key={book._id}>
            <BookCard book={book} />
          </SwiperSlide>
          ))}

        </Swiper>

        {/* book listings */}
      </div>
    </>
  );
}

export default TopSellers;
