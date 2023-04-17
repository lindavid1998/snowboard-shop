import '../styles/Cart.css';

function Cart(props) {
	const { cart, isVisible, hideCart, removeFromCart } = props;

	const renderedCart = cart.map((item) => (
		<li key={item.id} id={item.id} data-testid='cart-item'>
			<div className='item-name'>{item.name}</div>
			<button onClick={() => removeFromCart(item.id)}>Remove</button>
		</li>
	));

	return (
		<div
			className={isVisible ? 'Cart' : 'Cart hidden'}
			data-testid='cart'
		>
			<button onClick={hideCart}>Close</button>
			{cart && renderedCart}
		</div>
	);
}

export default Cart;
