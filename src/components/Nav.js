import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav(props) {
	const { openCart, totalItems } = props;
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
					<span className='num-of-items' data-testid='num-of-items'>
						{totalItems}
					</span>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
