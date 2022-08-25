import React, { useState, useEffect } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SavedShows = () => {

    const [movies, setMovies] = useState( [ ] );
    const { user } = UserAuth();

    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft -= slider.scrollLeft - 500;
    };

    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft -= slider.scrollLeft + 500;
    };

    useEffect(() => {

        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        })
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`);
    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID);
            await updateDoc (movieRef, {
                savedShows: result,
            });
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <>
            <h2 className='text-white font-bold md_text-xl p-4'>My Shows</h2>
            <div className='relative flex items-center group'>
                <BsArrowLeftShort 
                onClick={slideLeft} 
                className='left-0 bg-white absolute rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                size={20}
                />
                <div id={'slider'} 
                className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar scrollbar-hide relative'
                >
                    {movies.map((item, id) => (
                         <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>

                         <img 
                         className='w-full h-auto block' 
                         src={`https://image.tmdb.org/t/p/w500/${item?.img}`} 
                         alt={item?.title}
                         />
             
                         <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>

                                <Link to={`/movie/${item?.id}`}>
                             <p className='white-pace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                                 {item?.title}
                             </p>
                                </Link>

                             <p onClick={() => deleteShow(item.id)}
                             className='absolute text-gray-300 top-4 right-4'
                             >
                                <AiOutlineClose />
                            </p>
                             
                         </div>
                     </div>
                    ) ) };
                </div>
                <BsArrowRightShort 
                onClick={slideRight} 
                className=' right-0 bg-white absolute rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                size={20} 
                />
            </div>
        </>
    );
}

export default SavedShows;