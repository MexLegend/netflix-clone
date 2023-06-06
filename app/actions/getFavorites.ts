import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavorites = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {

        const favoritedMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });

        return favoritedMovies;
    } catch (error: any) {
        return [];
    }
};

export default getFavorites;