import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shop from './Shop';
import '@testing-library/jest-dom';

describe('Shop', () => {
	test('displays subcategories as menu bar', () => {
		render(<Shop />);

		const menuBar = screen.getByTestId('menu-bar').children;
		expect(menuBar.length).toBe(4);
		expect(menuBar[0].textContent).toMatch(/all/i);
		expect(menuBar[1].textContent).toMatch(/boards/i);
		expect(menuBar[2].textContent).toMatch(/boots/i);
		expect(menuBar[3].textContent).toMatch(/bindings/i);
	});

	test('displays all items on default view', () => {
		const mockItems = [
			{
				id: 0,
				category: 'boots',
			},
			{
				id: 1,
				category: 'boards',
			},
			{
				id: 2,
				category: 'bindings',
			},
			{
				id: 3,
				category: 'boards',
			},
		];

		render(<Shop items={mockItems}></Shop>);

		const items = screen.getByTestId('items').children;
		expect(items.length).toBe(mockItems.length);
	});

	test('displays items based on category chosen', () => {
		const mockItems = [
			{
				id: 0,
				category: 'boots',
			},
			{
				id: 1,
				category: 'boards',
			},
			{
				id: 2,
				category: 'bindings',
			},
			{
				id: 3,
				category: 'boards',
			},
		];

		render(<Shop items={mockItems} categoryShown='boards'></Shop>);
		const items = screen.getByTestId('items').children;
		expect(items.length).toBe(2);
	});

	test('calls onClickMenu correct number of times with correct inputs', async () => {
		const mockHandler = jest.fn();
		const user = userEvent.setup();

		render(<Shop onClickMenu={mockHandler} />);

		const menu = ['All', 'Boards', 'Boots', 'Bindings'];
		for (let i = 0; i < menu.length; i++) {
			await user.click(screen.getByText(menu[i]));
		}

		expect(mockHandler).toHaveBeenCalledTimes(4);
		expect(mockHandler).toHaveBeenNthCalledWith(1, 'All');
		expect(mockHandler).toHaveBeenNthCalledWith(2, 'Boards');
		expect(mockHandler).toHaveBeenNthCalledWith(3, 'Boots');
		expect(mockHandler).toHaveBeenNthCalledWith(4, 'Bindings');
	});
});
