import { Movie } from '@prisma/client';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface FavoritesStore {
    favorites: Movie[];
    add: (favorite: Movie) => void;
    remove: (id: string) => void;
    set: (favorites: Movie[]) => void;
}

const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set) => ({
            favorites: [],
            add: (favorite) => set((state) => ({ favorites: [...state.favorites, favorite] })),
            remove: (id) => set((state) => ({ favorites: state.favorites.filter((favorite) => favorite.id !== id) })),
            set: (favorites) => set({ favorites })
        }), {
        name: 'favoritesStore'
    }
    ));

export default useFavoritesStore;