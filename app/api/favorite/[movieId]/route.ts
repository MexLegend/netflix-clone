import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import { without } from "lodash";
import prisma from "@/app/libs/prismadb";

interface IParams {
    movieId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const { movieId } = params;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!existingMovie) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prisma.user.update({
            where: {
                email: currentUser.email,
            },
            data: {
                favoriteIds: updatedFavoriteIds as string[],
            }
        });

        return NextResponse.json(updatedUser)
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}