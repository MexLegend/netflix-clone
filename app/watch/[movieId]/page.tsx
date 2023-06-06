'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Movie } from '@prisma/client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import useMovie from '@/app/hooks/useMovie';

const Watch = () => {
    const router = useRouter();
    const { movieId } = useMovie();
    const [mounted, setMounted] = useState(false);
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {

        const getMovie = async () => {
            const { data: movie } = await axios.get(`/api/movies/${movieId}`);
            setMovie(movie);
            setMounted(true);
        };

        getMovie();
    }, [movieId]);

    if (!mounted) return <></>;

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">Watching:</span> {movie?.title}
                </p>
            </nav>
            <video className="h-full w-full" autoPlay controls src={movie?.videoUrl}></video>
        </div>
    )
}

export default Watch;