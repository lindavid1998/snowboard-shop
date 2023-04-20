import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

describe('Cart', () => {
	test('renders items, price, and checkout button if cart is not empty', async () => {
		const mockCart = [
			{
				id: 0,
				name: 'Season Kin Snowboard 2023',
				price: 349.3,
				category: 'boards',
			},
			{
				id: 1,
				name: 'GNU Young Money C2E Snowboard - Big Boys 2023',
				price: 279.99,
				category: 'boards',
			},
		];

		const cart = renderer
			.create(
				<BrowserRouter>
					<Cart cart={mockCart} />
				</BrowserRouter>
			)
			.toJSON();
		
		expect(cart).toMatchSnapshot();
	});

	test('routes to checkout page', async () => {
		const user = userEvent.setup();

		const mockCart = [
			{
				id: 0,
				name: 'Season Kin Snowboard 2023',
				price: 349.3,
				category: 'boards',
			},
			{
				id: 1,
				name: 'GNU Young Money C2E Snowboard - Big Boys 2023',
				price: 279.99,
				category: 'boards',
			},
		];
		render(
			<BrowserRouter>
				<Cart cart={mockCart} />
			</BrowserRouter>
		);

		// simulate click on checkout
		await act(async () => {
			await user.click(screen.getByText('Checkout'));
		});

		// verify routing
		expect(window.location.pathname).toBe('/checkout');
	});

	test('renders message if cart is empty', () => {
		render(
			<BrowserRouter>
				<Cart cart={[]} />
			</BrowserRouter>
		);
		expect(screen.getByText(/your cart is empty/i)).toBeTruthy()
	});
});
