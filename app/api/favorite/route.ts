import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { movieId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!existingMovie) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const user = await prisma.user.update({
            where: {
                email: currentUser.email,
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
