import '../styles/Cart.css';

function Cart(props) {
	const { cart, isVisible, hideCart } = props;
	
	const renderedCart = cart.map((item) => <li key={item.id}>{item.name}</li>);

	return (
		<div
			className={isVisible ? 'cart' : 'cart hidden'}
			data-testid='cart-component'
		>
			<button onClick={hideCart}>Close</button>
			{cart && renderedCart}
		</div>
	);
}

export default Cart;
