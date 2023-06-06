import { User } from '@prisma/client';
import getCurrentUser from '../actions/getCurrentUser';
import getFavorites from '../actions/getFavorites';
import getMovies from '../actions/getMovies';

import Navbar from './components/Navbar';
import generateMovies from '../actions/generateMovies';
import Billboard from './components/Billboard';
import MoviesList from './components/MoviesList';
// import InfoModal from '@/components/InfoModal';

const Home = async () => {

    const currentUser = await getCurrentUser();
    const favorites = await getFavorites();
    const movies = await getMovies();

    // Insert Seed Of Movies
    // await generateMovies();

    return (
        <>
            {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
            <Navbar currentUserProp={currentUser as User} />
            <Billboard />
            <div className="pb-40">
                <MoviesList title="Trending Now" movies={movies} />
                <MoviesList title="My List" movies={favorites} />
                {/* {children} */}
            </div>
        </>
    )
}

export default Home;