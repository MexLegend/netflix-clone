import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getMovies = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {

        const movies = await prisma.movie.findMany();

        return movies;

    } catch (error: any) {
        return [];
    }
};

export default getMovies;