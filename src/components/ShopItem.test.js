import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import ShopItem from './ShopItem';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ShopItem', () => {
	test('should render with name, price, image, and button', () => {
		const mockItem = {
			name: 'Season Kin Snowboard 2023',
			price: 349,
			imgSrc: '',
		};
		render(
			<Router>
				<ShopItem item={mockItem} />
			</Router>
		);

		const name = screen.getByText('Season Kin Snowboard 2023');
		const price = screen.getByText('$349');
		const img = screen.getByRole('img');
		const button = screen.getByText('Add to cart');

		expect(name).toBeTruthy();
		expect(price).toBeTruthy();
		expect(img).toBeTruthy();
		expect(button).toBeTruthy();
	});

	test('should call addToCart correctly', async () => {
		const mockItem = {
			name: 'Season Kin Snowboard 2023',
			price: 349,
			imgSrc: '',
			id: 0,
		};
		const mockFn = jest.fn();
		const user = userEvent.setup();
		render(
			<Router>
				<ShopItem item={mockItem} addToCart={mockFn} />
			</Router>
		);

		await act(async () => {
			await user.click(screen.getByRole('button'));
		});
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith(0);
	});

	test('should route to item page when item is clicked', async () => {
		const mockItem = {
			name: 'Season Kin Snowboard',
			price: 349,
			imgSrc: '',
			id: 0,
		};
		const user = userEvent.setup();
		render(
			<Router>
				<ShopItem item={mockItem} />
			</Router>
		);

		await act(async () => {
			await user.click(screen.getByText(/season kin snowboard/i));
		});

		expect(window.location.pathname).toBe('/shop/0');
	});
});
