import React, { useState } from 'react';
import ShopItem from './ShopItem';

export default function Shop(props) {
	const [category, setCategory] = useState('all');
	const { items, handleAddToCart } = props;

	const menu = ['All', 'Boards', 'Boots', 'Bindings'];
	const renderedMenuBar = menu.map((tab, i) => (
		<li
			key={i}
			onClick={(e) => setCategory(e.target.textContent.toLowerCase())}
		>
			{tab}
		</li>
	));

	const filteredItems =
		category === 'all'
			? [...items]
			: items.filter((item) => item.category === category);

	const renderedItems = filteredItems.map((item) => (
		<li key={item.id}>
			<ShopItem item={item} handleAddToCart={handleAddToCart}></ShopItem>
		</li>
	));

	return (
		<div className='Shop'>
			<ul className='menu-bar' data-testid='menu-bar'>
				{renderedMenuBar}
			</ul>

			<ul className='items' data-testid='items'>
				{renderedItems}
			</ul>
		</div>
	);
}

Shop.defaultProps = {
	items: [],
};
