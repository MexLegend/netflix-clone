import { User } from '@prisma/client';
import getCurrentUser from '../actions/getCurrentUser';
import getFavorites from '../actions/getFavorites';
import getMovies from '../actions/getMovies';

import Navbar from './components/Navbar';
import generateMovies from '../actions/generateMovies';
import Billboard from './components/Billboard';
import MoviesContainer from './components/MoviesContainer';
import InfoModal from '@/app/components/InfoModal';
import useInfoModalStore from '../hooks/useInfoModalStore';

const Home = async () => {

    const currentUser = await getCurrentUser();
    const favorites = await getFavorites();
    const movies = await getMovies();
    // const { isOpen, closeModal } = useInfoModalStore();

    // Insert Seed Of Movies
    // await generateMovies();

    return (
        <>
            <InfoModal />
            <Navbar currentUserProp={currentUser as User} />
            <Billboard />
            <MoviesContainer favorites={favorites} movies={movies} />
        </>
    )
}

export default Home;