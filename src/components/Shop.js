import React, { useState } from 'react';
import ShopItem from './ShopItem';
import '../styles/Shop.css';

export default function Shop(props) {
	const [category, setCategory] = useState('all');
	const { items } = props;

	const menu = ['All', 'Boards', 'Boots', 'Bindings'];
	const renderedMenuBar = menu.map((tab, i) => (
		<li
			key={i}
			className={tab === 'All' ? 'menu-bar-tab active' : 'menu-bar-tab'}
			onClick={(e) => {
				setCategory(e.target.textContent.toLowerCase());
				let siblings = e.target.parentNode.childNodes;
				siblings.forEach((sibling) => sibling.classList.remove('active'));
				e.target.classList.add('active');
			}}
		>
			{tab}
		</li>
	));

	const filteredItems =
		category === 'all'
			? [...items]
			: items.filter((item) => item.category === category);

	const renderedItems = filteredItems.map((item) => (
		<li className='item' key={item.id}>
			<ShopItem item={item} />
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
