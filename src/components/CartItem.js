import '../styles/CartItem.css';
import '../styles/item-card.css';

function CartItem(props) {
	const { item, removeFromCart, updateQuantity } = props;

	return (
		<li className='CartItem item-card' id={item.id} data-testid='cart-item'>
			<div className='info'>
				<div className='item-name' data-testid='item-name'>
					{item.name}
				</div>
				<div className='item-price'>${item.price}</div>
				<div className='quantity-input'>
					<label htmlFor='quantity'>Qty:</label>
					<input
						type='number'
						id='quantity'
						name='quantity'
						min='1'
						value={item.quantity}
						data-testid='quantity'
						onChange={(e) => updateQuantity(item.id, e.target.value)}
					/>
				</div>
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
