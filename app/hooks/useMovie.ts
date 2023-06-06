import { useParams } from "next/navigation";
import { useMemo } from "react";

const useMovie = () => {
    const params = useParams();

    const movieId = useMemo(() => {
        if (!params?.movieId) {
            return '';
        }

        return params.movieId as string;
    }, [params?.movieId]);

    return useMemo(() => ({ movieId }), [movieId]);
};

export default useMovie;