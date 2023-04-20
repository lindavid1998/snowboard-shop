import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className='Home'>
			<div className='overlay'>
				<div className='hero-text'>Spring Collection</div>
				<div className='hero-subtext'>
					Keep the party going with gear built for spring’s sun, slush, and good
					times.
				</div>
				<Link to='/shop'>
					<button className='btn-translate-on-hover btn-filled btn-medium'>
						Shop Now
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
