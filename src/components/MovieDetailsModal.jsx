import React from 'react'

const MovieDetailsModal = ({movie, onClose, isFavorite, onToggleFavorite}) => {
   
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : `https://via.placeholder.com/500x750?text=No+Image`;
   
    return (
        <div className='modal modal-open'>
            <div className='modal-box w-full max-w-2xl sm:max-w-3xl bg-base-100 shadow-xl'>
                <h3 className='font-bold text-xl sm:text-2xl mb-4'>{movie.title}</h3>
                {/* Poster */}
                <img src={posterUrl} alt={movie.title} className="rounded-lg mb-4 w-full
                object-contain max-h-96"/>
                {/* Description */}
            </div>
        </div>
    )
}


export default MovieDetailsModal;