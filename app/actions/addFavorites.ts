import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const addFavorites = async (movieId: string) => {

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

        const user = await prisma.user.update({
            where: {
                email: currentUser.email || '',
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        });

        return user;
    } catch (error: any) {
        return null;
    }
};

export default addFavorites;