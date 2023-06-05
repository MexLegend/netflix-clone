'use client';

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useCurrentUser from '@/app/hooks/useCurrentUser';

import UserCard from "./components/UserCard";

const Profiles = () => {
    const router = useRouter();
    const [currentUser] = useCurrentUser((state) => [state.currentUser])


    const selectProfile = useCallback(() => {
        router.push('/');
    }, [router]);

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => selectProfile()}>
                        <UserCard name={currentUser?.name as string} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profiles;