import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Movie from './Movie';

const Row = ({ title, fetchURL, rowID }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchURL).then((r) => {
            setMovies(r.data.results)
        })
    }, [fetchURL]);

    const slideLeft = () => {
        let slider = document.getElementById('slider' + rowID);
        slider.scrollLeft -= 500
    };

    const slideRight = () => {
        let slider = document.getElementById('slider' + rowID);
        slider.scrollLeft += 500
    };

    //console.log(movies)

    return (
        <>

            <h2 className='text-white font-bold md_text-xl p-4'>{title}</h2>

            <div className='relative flex items-center group'>

                <BsArrowLeftShort onClick={slideLeft} className='left-0 bg-white absolute rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={20} />
                <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-hide relative'>
                    {movies.map((item, id) => (
                        <Movie key={id} item={item} />
                    ))}
                </div>
                <BsArrowRightShort onClick={slideRight} className=' right-0 bg-white absolute rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={20} />

            </div>

        </>
    )
};

export default Row