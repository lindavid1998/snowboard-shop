import '../styles/Cart.css';
import { Link } from 'react-router-dom';

function Cart(props) {
	const { cart, isVisible, hideCart, removeFromCart } = props;

	const renderedCart = cart.map((item) => (
		<li key={item.id} id={item.id} data-testid='cart-item'>
			<div className='item-name'>{item.name}</div>
			<button onClick={() => removeFromCart(item.id)}>Remove</button>
		</li>
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
