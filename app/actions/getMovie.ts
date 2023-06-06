import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getMovie = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return null;
    }

    try {

        const moviesCount = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * moviesCount);

        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return randomMovies[0];
    } catch (error: any) {
        return null;
    }
};

export default getMovie;