import '../styles/Cart.css';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Cart(props) {
	const { cart, isVisible, hideCart, removeFromCart } = props;

	const renderedCart = cart.map((item) => (
		<CartItem
			item={item}
			key={item.id}
			removeFromCart={removeFromCart}
		/>
	));

	return (
		<div className={isVisible ? 'Cart' : 'Cart hidden'} data-testid='cart'>

			<FontAwesomeIcon
				size='lg'
				className='btn-close-cart'
				icon={faXmark}
				onClick={hideCart}
				data-testid='btn-close-cart'
			/>

			{cart && renderedCart}

			<button className='btn-filled btn-checkout'>
				<Link to='/checkout'>
					Checkout
				</Link>
			</button>
		</div>
	);
}

export default Cart;
