'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface MovieCradImageProps {
    movieId: string;
    movieThumbnailUrl: string;
    isExtendedClasses?: boolean;
}

const MovieCardImage: React.FC<MovieCradImageProps> = ({ movieId, movieThumbnailUrl, isExtendedClasses }) => {
    const router = useRouter();

    return (
        <img
            onClick={() => router.push(`/watch/${movieId}`)}
            src={movieThumbnailUrl}
            alt="Movie"
            draggable={false}
            className={`
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                w-full
                h-[12vw]
                ${!isExtendedClasses && "rounded-t-md"}
                ${isExtendedClasses && `rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300`}
            `}
        />
    );
}

export default MovieCardImage;