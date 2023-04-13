import { Link } from 'react-router-dom';

function Nav({ openCart }) {
	return (
		<nav className='Nav'>
			<ul>
				<li aria-label='home'>
					<Link to='/'>Snowboard Shop</Link>
				</li>

				<li aria-label='my-orders'>My Orders</li>

				<li aria-label='shop'>
					<Link to='/shop'>Shop</Link>
				</li>

				<li aria-label='help'>Help</li>

				<li aria-label='cart' onClick={openCart}>
					Cart
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
