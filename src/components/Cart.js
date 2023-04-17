import '../styles/Cart.css';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart(props) {
	const { cart, isVisible, hideCart, removeFromCart } = props;

	const renderedCart = cart.map((item) => (
		<CartItem
			item={item}
			key={item.id}
			className='cart-item'
			removeFromCart={removeFromCart}
		/>
	));

	return (
		<div className={isVisible ? 'Cart' : 'Cart hidden'} data-testid='cart'>
			<button onClick={hideCart}>Close</button>
			{cart && renderedCart}
			<Link to='/checkout'>
				<button>Checkout</button>
			</Link>
		</div>
	);
}

export default Cart;
