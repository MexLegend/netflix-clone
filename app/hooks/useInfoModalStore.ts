import { Movie } from '@prisma/client';
import { create } from 'zustand';

export interface ModalStoreInterface {
    movie?: Movie;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setMovie: (movie: Movie | undefined) => void,
    // openModal: (movie: Movie) => void;
    // closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
    movie: undefined,
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    setMovie: (movie) => set({ movie }),
    // openModal: (movie: Movie) => set({ isOpen: true, movie }),
    // closeModal: () => set({ isOpen: false, movie: undefined }),
}));

export default useInfoModalStore;