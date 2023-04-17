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
		const cart = screen.getByTestId('cart-component');
		const cartBtn = screen.getByRole('listitem', { name: /cart/i });

		expect(cart).toHaveClass('cart hidden');
		await act(async () => {
			await user.click(cartBtn);
		});
		expect(cart).toHaveClass('cart');

		const closeBtn = screen.getByRole('button', { name: /close/i });
		await act(async () => {
			await user.click(closeBtn);
		});

		expect(cart).toHaveClass('cart hidden');
	});

	test('adds items to cart', async () => {
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
		const addToCartBtn = within(items[0]).getByText('Add to cart');
		await act(async () => {
			await user.click(addToCartBtn);
		});

		const cart = screen.getByTestId('cart-component');
		const cartItems = within(cart).getAllByRole('listitem');
		expect(cartItems.length).toBe(1);
		expect(cartItems[0].textContent).toMatch('item one');
	});

	test.todo('removes items from cart');
});
