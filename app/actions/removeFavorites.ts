import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { without } from "lodash";

const removeFavorites = async (movieId: string) => {

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return null;
    }

    try {

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!existingMovie) {
            return null;
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prisma.user.update({
            where: {
                email: currentUser.email || '',
            },
            data: {
                favoriteIds: updatedFavoriteIds,
            }
        });

        return updatedUser;
    } catch (error: any) {
        return null;
    }
};

export default removeFavorites;