import React from 'react';

export default function Shop(props) {
	const { categoryShown, items, onClickMenu } = props;

	const menu = ['All', 'Boards', 'Boots', 'Bindings'];
	const renderedMenuBar = menu.map((tab, i) => (
		<li key={i} onClick={(e) => onClickMenu(e.target.textContent)}>
			{tab}
		</li>
	));

	let filteredItems;
	if (categoryShown === 'All') {
		filteredItems = [...items];
	} else {
		filteredItems = items.filter((item) => item.category === categoryShown);
	}

	const renderedItems = filteredItems.map((item) => (
		<li key={item.id}>{item.id}</li>
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
	categoryShown: 'All',
	items: [],
};
