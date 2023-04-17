import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('App', () => {
	test('shows and hides cart', async () => {
		render(<App />, { wrapper: BrowserRouter });

		const user = userEvent.setup();
		const cart = screen.getByTestId('cart');
		const cartBtn = screen.getByRole('listitem', { name: /cart/i });

		expect(cart).toHaveClass('Cart hidden');
		await act(async () => {
			await user.click(cartBtn);
		});
		expect(cart).toHaveClass('Cart');

		const closeBtn = screen.getByRole('button', { name: /close/i });
		await act(async () => {
			await user.click(closeBtn);
		});

		expect(cart).toHaveClass('Cart hidden');
	});

	test('adds and removes items from cart', async () => {
		const user = userEvent.setup();
		const mockItems = [
			{
				name: 'item one',
				id: 0,
			},
			{
				name: 'item two',
				id: 1,
			},
		];

		render(
			<MemoryRouter initialEntries={['/shop']}>
				<App items={mockItems} />
			</MemoryRouter>
		);

		const items = screen.getByTestId('items').children;
		let cartItems;

		await act(async () => {
			await user.click(within(items[0]).getByText('Add to cart'));
		});
		cartItems = screen.getAllByTestId('cart-item');
		expect(cartItems.length).toBe(1);
		expect(Number(cartItems[0].id)).toEqual(0);

		await act(async () => {
			await user.click(within(items[1]).getByText('Add to cart'));
		});
		cartItems = screen.getAllByTestId('cart-item');
		expect(cartItems.length).toBe(2);
		expect(Number(cartItems[1].id)).toEqual(1);

		await act(async () => {
			await user.click(within(cartItems[0]).getByRole('button'));
		});
		cartItems = screen.getAllByTestId('cart-item');
		expect(cartItems.length).toBe(1);
		expect(Number(cartItems[0].id)).toEqual(1);
	});
});
