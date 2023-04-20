import React from 'react';
import '../styles/ShopItem.css'
import '../styles/Item.css'

export default function ShopItem(props) {
	const { item, addToCart } = props;

	return (
		<div className='ShopItem item' id={item.id}>
			<img src={item.imgSrc} alt={item.name} />
			<div className='item-name'>{item.name}</div>
			<div className='item-price'>${item.price}</div>
			<button className='btn-filled btn-small btn-shop-item' onClick={() => addToCart(item.id)}>Add to cart</button>
		</div>
	);
}
