import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Nav from './Nav';
import App from '../App';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

describe.only('Nav', () => {
	test('renders links and routes properly', async () => {
		render(
			<Router>
				<Nav />
			</Router>
		);

		const help = screen.getByText(/help/i);
		expect(help).toBeTruthy();

		const myOrders = screen.getByText(/my orders/i);
		expect(myOrders).toBeTruthy();

		const homeLink = screen.getByText('Snowboard Shop');
		const shopLink = screen.getByText('Shop');

		const user = userEvent.setup();

		await act(async () => {
			await user.click(shopLink);
		});
		expect(window.location.pathname).toBe('/shop');

		await act(async () => {
			await user.click(homeLink);
		});
		expect(window.location.pathname).toBe('/');
	});

	test('shows cart when cart is clicked', async () => {
		// render navbar
		render(<App />);

		// assert that cart is not visible
		let cart = screen.getByTestId('cart-component');
		expect(cart).toHaveClass('cart hidden');

		// select cart button
		let cartBtn = screen.getByRole('listitem', { name: /cart/i });

		// simulate click
		const user = userEvent.setup();
		await act(async () => {
			await user.click(cartBtn);
		});

		// assert that cart is visible
		expect(cart).toHaveClass('cart');
	});
});
