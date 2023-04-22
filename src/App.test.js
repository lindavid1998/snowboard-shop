import { render, screen } from '@testing-library/react';
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

		const closeBtn = screen.getByTestId('btn-close-cart');
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
			<MemoryRouter initialEntries={['/shop/0']}>
				<App items={mockItems} />
			</MemoryRouter>
		);

		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});

		let cartItems = screen.getAllByTestId('cart-item');
		expect(cartItems.length).toBe(1);
		expect(Number(cartItems[0].id)).toEqual(0);
		expect(screen.getByTestId('num-of-items').textContent).toBe('1');

		await act(async () => {
			await user.click(screen.getByText('Shop'));
		});

		await act(async () => {
			await user.click(screen.getByText('item two'));
		});

		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});

		cartItems = screen.getAllByTestId('cart-item');
		expect(cartItems.length).toBe(2);
		expect(Number(cartItems[1].id)).toEqual(1);
		expect(screen.getByTestId('num-of-items').textContent).toBe('2');

		await act(async () => {
			await user.click(screen.getAllByText('Remove')[0]);
		});
		cartItems = screen.getAllByTestId('cart-item');
		expect(cartItems.length).toBe(1);
		expect(Number(cartItems[0].id)).toEqual(1);
		expect(screen.getByTestId('num-of-items').textContent).toBe('1');
	});

	test('clears cart when order is placed', async () => {
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
			<MemoryRouter initialEntries={['/shop/0']}>
				<App items={mockItems} />
			</MemoryRouter>
		);

		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});

		await act(async () => {
			await user.click(screen.getByText(/checkout/i));
		});

		await act(async () => {
			await user.click(screen.getByText(/place order/i));
		});
		expect(screen.queryByTestId('cart-item')).toBeFalsy();
		expect(screen.getByText(/0/)).toBeTruthy();
	});

	test('routes to confirmation page when order is placed', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/checkout']}>
				<App items={[]} />
			</MemoryRouter>
		);

		expect(screen.getByText(/place order/i)).toBeInTheDocument();

		await act(async () => {
			await user.click(screen.getByText(/place order/i));
		});

		expect(screen.getByText(/your order is confirmed/i)).toBeInTheDocument();
	});
});
