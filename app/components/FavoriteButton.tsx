'use client';

import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { includes } from "lodash";

import useCurrentUser from '@/app/hooks/useCurrentUserStore';
import useFavoritesStore from '@/app/hooks/useFavoritesStore';
import useMoviesStore from '@/app/hooks/useMoviesStore';

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const [setCurrentUser, currentUser] = useCurrentUser((state) => [state.setUser, state.currentUser]);
    const [setFavorites] = useFavoritesStore((state) => [state.set]);
    const [moviesStore] = useMoviesStore((state) => [state.movies]);

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        try {
            if (isFavorite) {
                response = await axios.delete(`/api/favorite/${movieId}`);
            } else {
                response = await axios.post('/api/favorite', { movieId });
            }

            const updatedFavoriteIds: string[] = response?.data.favoriteIds;

            setCurrentUser({ ...currentUser!, favoriteIds: updatedFavoriteIds });
            setFavorites(moviesStore.filter(movie => includes(updatedFavoriteIds, movie.id)));
        } catch (error) {
            console.log(error);

            toast.error('Something went wrong!')
        }


    }, [movieId, moviesStore, isFavorite, currentUser, setCurrentUser, setFavorites]);

    const Icon = isFavorite ? CheckIcon : PlusIcon;

    return (
        <div
            onClick={toggleFavorites}
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