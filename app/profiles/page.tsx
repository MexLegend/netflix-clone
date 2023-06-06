import { User } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";
import UserCard from "./components/UserCard";

const Profiles = async () => {

    const currentUser = await getCurrentUser();

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <UserCard currentUser={currentUser as User} />
                </div>
            </div>
        </div>
    );
}

export default Profiles;