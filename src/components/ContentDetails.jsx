import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContentDetails = () => {
  
    const [movies, setMovies] = useState([]);
   
    const params = useParams();
    const movieID = params.id;
    const movie = `https://api.themoviedb.org/3/movie/${movieID}?api_key=9bef126ba9d29cd9da584dab73bd39c1&language=en-US`

    useEffect(() => {
        axios.get(movie).then((r) => {
            setMovies(r.data)
        })
    }, [])

    return (
        <div className='w-full h-[550px] text-white'>

            <div className='w-full h-full'>

                
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movies?.backdrop_path}`} alt={movies?.title} />

                <div className='absolute w-full top-[20%] p-4 md:p-8'>

                    <h1 className='text-3xl md:text-5xl font-bold '>{movies?.title}</h1>

                    <div className='my-4'>
                        <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                        <button className='border text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
                    </div>

                    <p className='text-gray-400 text-2xs'>Released: {movies?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 text-2xs'>{movies?.overview}</p>

                </div>

            </div>

        </div>
    )
}

export default ContentDetails;