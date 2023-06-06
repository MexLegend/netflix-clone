'use client';

import { FC, useEffect, useState } from 'react';
import MoviesList from './../components/MoviesList';
import { Movie } from '@prisma/client';
import useFavoritesStore from '@/app/hooks/useFavoritesStore';
import useMoviesStore from '@/app/hooks/useMoviesStore';

interface MoviesContainerProps {
    favorites: Movie[],
    movies: Movie[]
}

const MoviesContainer: FC<MoviesContainerProps> = ({ favorites, movies }) => {

    const [mounted, setMounted] = useState(false);
    const [setFavorites, favoritesStore] = useFavoritesStore((state) => [state.set, state.favorites]);
    const [setMovies, moviesStore] = useMoviesStore((state) => [state.set, state.movies]);

    useEffect(() => {
        if (favorites && favoritesStore.length === 0) setFavorites(favorites);
        if (movies && moviesStore.length === 0) setMovies(movies);
        setMounted(true);
    }, [favorites, favoritesStore, setFavorites, movies, moviesStore, setMovies]);

    if (!mounted) return <></>;

    return (
        <div className="pb-40">
            <MoviesList title="Trending Now" movies={movies} />
            <MoviesList title="My List" movies={favoritesStore} />
        </div>
    );
}

export default MoviesContainer;