import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import ItemDetail from './ItemDetail';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'), 
	useParams: () => ({
		id: '0',
	}),
}));

describe('ItemDetail', () => {
	test('should render with name, price, image, and button', () => {
		const mockItems = [
			{
				name: 'Season Kin Snowboard 2023',
				price: 349,
				imgSrc: '',
				id: 0,
			},
		];

		render(<ItemDetail items={mockItems} />);

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
		const mockItems = [
			{
				name: 'Season Kin Snowboard 2023',
				price: 349,
				imgSrc: '',
				id: 0,
			},
		];

		const mockFn = jest.fn();
		const user = userEvent.setup();
		render(<ItemDetail items={mockItems} addToCart={mockFn} />);

		await act(async () => {
			await user.click(screen.getByRole('button'));
		});
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith(0);
	});
});
