'use client';

import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import useInfoModalStore from '@/app/hooks/useInfoModalStore';
import { Movie } from '@prisma/client';

interface ButtonProps {
    movie: Movie;
}

const MoreInfoButton: React.FC<ButtonProps> = ({ movie }) => {

    const { setIsOpen, setMovie } = useInfoModalStore();

    const handleOpenModal = useCallback(() => {
        setIsOpen(true);
        setMovie(movie);
    }, [setIsOpen, setMovie, movie]);

    return (
        <button
            onClick={handleOpenModal}
            className="
                bg-white
                text-white
                bg-opacity-30 
                rounded-md 
                py-1 md:py-2 
                px-2 md:px-4
                w-auto 
                text-xs lg:text-lg 
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-opacity-20
                transition
            "
        >
            <InformationCircleIcon className="w-4 md:w-7 mr-1" />
            More Info
        </button>

    );
}

export default MoreInfoButton;