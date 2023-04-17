function CartItem(props) {
	const { item, className, removeFromCart } = props;

	return (
		<li className={className} id={item.id} data-testid='cart-item'>
			<div className='item-name'>{item.name}</div>
			<div className='item-price'>${item.price}</div>
			<button onClick={() => removeFromCart(item.id)}>Remove</button>
		</li>
	);
}

export default CartItem;
