import './Cart.css';

function Cart(props) {
	const { cart, isVisible, hideCart } = props;
	return (
		<div
			className={isVisible ? 'cart' : 'cart hidden'}
			data-testid='cart-component'
		>
			Cart
		</div>
	);
}

export default Cart;
