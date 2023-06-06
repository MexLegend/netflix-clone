import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    movieId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();
        const { movieId } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!movieId || typeof movieId !== 'string') {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movie) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        return NextResponse.json(movie)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}