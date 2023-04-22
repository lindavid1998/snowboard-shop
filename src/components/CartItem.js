import '../styles/CartItem.css';
import '../styles/item-card.css'

function CartItem(props) {
	const { item, removeFromCart } = props;

	return (
		<li className='CartItem item-card' id={item.id} data-testid='cart-item'>
			<div className='info'>
				<div className='item-name'>{item.name}</div>
				<div className='item-price'>${item.price}</div>
			</div>
			<img src={item.imgSrc} alt={item.name} />
			<button
				className='btn-filled btn-remove-from-cart btn-orange-text'
				onClick={() => removeFromCart(item.id)}
			>
				Remove
			</button>
		</li>
	);
}

export default CartItem;
