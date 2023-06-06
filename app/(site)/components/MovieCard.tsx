import React from 'react';

import { MovieInterface } from '@/app/types';
import FavoriteButton from '@/app/components/FavoriteButton';
import MoreInfoCircleButton from './MoreInfoCircleButton';
import PlayCircleButton from './PlayCircleButton';
import MovieCardImage from './MovieCardImage';

interface MovieCardProps {
    movie: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <MovieCardImage movieId={movie.id} movieThumbnailUrl={movie.thumbnailUrl} isExtendedClasses />
            <div className="
                    opacity-0
                    absolute
                    top-0
                    transition
                    duration-200
                    z-10
                    invisible
                    sm:visible
                    delay-300
                    w-full
                    scale-0
                    group-hover:scale-110
                    group-hover:-translate-y-[6vw]
                    group-hover:translate-x-[2vw]
                    group-hover:opacity-100
                "
            >
                <MovieCardImage movieId={movie.id} movieThumbnailUrl={movie.thumbnailUrl} />
                <div className="
                        z-10
                        bg-zinc-800
                        p-2
                        lg:p-4
                        absolute
                        w-full
                        transition
                        shadow-md
                        rounded-b-md
                    "
                >
                    <div className="flex flex-row items-center gap-3">
                        <PlayCircleButton movieId={movie.id} />
                        <FavoriteButton movieId={movie.id} />
                        <MoreInfoCircleButton movie={movie} />
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{movie.duration}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
                        <p>{movie.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;