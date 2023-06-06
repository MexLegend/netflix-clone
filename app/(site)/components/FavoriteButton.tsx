'use client';

import React, { useCallback, useMemo } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

import addFavorites from '@/app/actions/addFavorites';
import removeFavorites from '@/app/actions/removeFavorites';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import { User } from '@prisma/client';

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const [setCurrentUser, currentUser] = useCurrentUser((state) => [state.setUser, state.currentUser]);

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response: User | null;

        if (isFavorite) {
            response = await removeFavorites(movieId);
        } else {
            response = await addFavorites(movieId);
        }

        const updatedFavoriteIds: string[] = response?.favoriteIds ?? [];

        setCurrentUser({ ...currentUser!, favoriteIds: updatedFavoriteIds });

    }, [movieId, isFavorite, currentUser]);

    const Icon = isFavorite ? CheckIcon : PlusIcon;

    return (
        <div
            // onClick={toggleFavorites}
            className="
                cursor-pointer 
                group/item 
                w-6 
                h-6 
                lg:w-10 
                lg:h-10 
                border-white 
                border-2 
                rounded-full 
                flex 
                justify-center 
                items-center 
                transition 
                hover:border-neutral-300
            "
        >
            <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
        </div>
    )
}

export default FavoriteButton;