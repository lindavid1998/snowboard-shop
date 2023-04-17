import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import ShopItem from './ShopItem';

describe('ShopItem', () => {
	test('should render with name, price, image, and button', () => {
		const mockItem = {
			name: 'Season Kin Snowboard 2023',
			price: 349,
			imgSrc: '',
		};
		render(<ShopItem item={mockItem} />);

		const name = screen.getByText('Season Kin Snowboard 2023');
		const price = screen.getByText('$349');
		const img = screen.getByRole('img');
		const button = screen.getByText('Add to cart');

		expect(name).toBeTruthy();
		expect(price).toBeTruthy();
		expect(img).toBeTruthy();
		expect(button).toBeTruthy();
	});

	test('should call handleClick correctly', async () => {
		const mockItem = {
			name: 'Season Kin Snowboard 2023',
			price: 349,
			imgSrc: '',
			id: 0,
		};
		const mockFn = jest.fn();
		const user = userEvent.setup();
		render(<ShopItem item={mockItem} addToCart={mockFn} />);

		await act(async () => {
			await user.click(screen.getByRole('button'));
		});
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith(0);
	});
});
