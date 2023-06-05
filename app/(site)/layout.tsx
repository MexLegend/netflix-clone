
import Navbar from './components/Navbar';
import getCurrentUser from '../actions/getCurrentUser';
// import Billboard from '@/components/Billboard';
// import MovieList from '@/components/MovieList';
// import InfoModal from '@/components/InfoModal';
// import useMovieList from '@/hooks/useMovieList';
// import useFavorites from '@/hooks/useFavorites';
// import useInfoModalStore from '@/hooks/useInfoModalStore';

export default async function HomeLayout({
    children
}: {
    children: React.ReactNode,
}) {

    const currentUser = await getCurrentUser();

    // const { data: movies = [] } = useMovieList();
    // const { data: favorites = [] } = useFavorites();
    // const { isOpen, closeModal } = useInfoModalStore();

    return (
        <>
            <h1 className='text-green-600'>Netflix Clone</h1>
            {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
            <Navbar currentUser={currentUser} />
            {/* <Billboard /> */}
            <div className="pb-40">
                {/* <MovieList title="Trending Now" data={movies} />
                <MovieList title="My List" data={favorites} /> */}
                {/* {children} */}
            </div>
        </>
    )
}