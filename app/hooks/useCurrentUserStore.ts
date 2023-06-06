import { User } from '@prisma/client';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CurrentUserStore {
    currentUser: User | null;
    setUser: (currentUser: User | null) => void;
}

const useCurrentUserStore = create<CurrentUserStore>()(
    persist(
        (set) => ({
            currentUser: null,
            setUser: (currentUser) => set({ currentUser })
        }), {
        name: 'userStore'
    }
    ));

export default useCurrentUserStore;