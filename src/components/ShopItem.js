import React from 'react';

export default function ShopItem(props) {
	const { item, addToCart } = props;

	return (
		<div className='ShopItem' id={item.id}>
			<img src={item.imgSrc} alt={item.name} />
			<div className='name'>{item.name}</div>
			<div className='price'>${item.price}</div>
			<button onClick={() => addToCart(item.id)}>Add to cart</button>
		</div>
	);
}
