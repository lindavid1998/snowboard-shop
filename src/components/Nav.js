import { Link } from 'react-router-dom';
import './Nav.css';

function Nav({ openCart }) {
	return (
		<nav className='Nav'>
			<ul>
				<li aria-label='home' className='hover-underline-animation'>
					<Link to='/'>Snowboard Shop</Link>
				</li>

				<li aria-label='my-orders' className='hover-underline-animation'>
					My Orders
				</li>

				<li aria-label='shop' className='hover-underline-animation'>
					<Link to='/shop'>Shop</Link>
				</li>

				<li aria-label='help' className='hover-underline-animation'>
					Help
				</li>

				<li
					aria-label='cart'
					className='hover-underline-animation'
					onClick={openCart}
				>
					Cart
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
