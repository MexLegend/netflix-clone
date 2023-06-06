'use client';

import { FC, useCallback, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/app/hooks/useCurrentUser";

const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
];

interface UserCardProps {
    currentUser: User
}

const UserCard: FC<UserCardProps> = ({ currentUser }) => {

    const [imgSrc, setImgSrc] = useState<string>("/images/default-blue.png");

    useEffect(() => {
        setImgSrc(images[Math.floor(Math.random() * 4)]);
    }, []);

    const router = useRouter();

    const selectProfile = useCallback(() => {
        router.push('/');
    }, [router]);

    return (
        <div onClick={selectProfile}>
            <div className="group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                    <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{currentUser?.name}</div>
            </div>
        </div>
    );
}

export default UserCard;