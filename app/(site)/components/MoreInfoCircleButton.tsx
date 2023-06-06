'use client';

import React, { useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useInfoModalStore from '@/app/hooks/useInfoModalStore';
import { Movie } from '@prisma/client';

interface MoreInfoButtonProps {
    movie: Movie;
}

const MoreInfoCircleButton: React.FC<MoreInfoButtonProps> = ({ movie }) => {

    const { setIsOpen, setMovie } = useInfoModalStore();

    const handleOpenModal = useCallback(() => {
        setIsOpen(true);
        setMovie(movie);
    }, [setIsOpen, setMovie, movie]);

    return (
        <div
            onClick={handleOpenModal}
            className="
            cursor-pointer 
            ml-auto 
            group/item 
            w-6 
            h-6 
            lg:w-10 
            lg:h-10 
            border-white 
            border-2 
            rounded-full 
            flex justify-center 
            items-center 
            transition 
            hover:border-neutral-300
        "
        >
            <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
        </div>
    );
}

export default MoreInfoCircleButton;