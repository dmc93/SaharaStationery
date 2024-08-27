import homeImage from '../homeImage.png';
import { Link } from 'react-router-dom';
import '../CSS/HomePage.css';

const HomePage = () => {
    return (
        <main className='home-body'>
            <section className='feature-panel'>
                <h1 className='home-title'>It's not a mirage</h1>
                <p className='feature-text'>The hottest prices around!</p>
                <Link to="/shop" className='banner-button'>
                    Browse stationery
                </Link>
            </section>
            <img className='home-image' src={homeImage} alt="Home banner" />
        </main>
    );
}

export default HomePage;
