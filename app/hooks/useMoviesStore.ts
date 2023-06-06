import { Movie } from '@prisma/client';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface MoviesStore {
    movies: Movie[];
    add: (movie: Movie) => void;
    remove: (id: string) => void;
    set: (movies: Movie[]) => void;
}

const useMoviesStore = create<MoviesStore>()(
    persist(
        (set) => ({
            movies: [],
            add: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
            remove: (id) => set((state) => ({ movies: state.movies.filter((movie) => movie.id !== id) })),
            set: (movies) => set({ movies })
        }), {
        name: 'moviesStore'
    }
    ));

export default useMoviesStore;