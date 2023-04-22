import React from 'react';
import '../styles/ShopItem.css'
import '../styles/item-card.css'
import { Link } from 'react-router-dom';

export default function ShopItem(props) {
	const { item, addToCart } = props;

	return (
		<div className='ShopItem item-card' id={item.id}>
			<img src={item.imgSrc} alt={item.name} />

			<Link to={`/shop/${item.id}`}>
				<div className='item-name'>{item.name}</div>
			</Link>

			<div className='item-price'>${item.price}</div>

			<button
				className='btn-filled btn-small btn-shop-item btn-orange-fill'
				onClick={() => addToCart(item.id)}
			>
				Add to cart
			</button>
		</div>
	);
}
