export interface MovieInterface {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
    genre: string;
}

export interface FullUserInterface {
    id: string,
    name: string,
    image: string | undefined,
    email: string | undefined,
    emailVerified: Date | undefined,
    hashedPassword: string,
    createdAt: Date,
    updatedAt: Date,
    favoriteIds: MovieInterface[]
}