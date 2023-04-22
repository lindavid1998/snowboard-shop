import { render, screen } from '@testing-library/react';
import Checkout from './Checkout';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

describe('Checkout', () => {
	test('renders cart items and payment form', () => {
		const mockCart = [
			{
				id: 0,
				name: 'Season Kin Snowboard 2023',
				price: 349.3,
				category: 'boards',
				qty: 1,
			},
			{
				id: 1,
				name: 'GNU Young Money C2E Snowboard - Big Boys 2023',
				price: 279.99,
				category: 'boards',
				qty: 2,
			},
		];
		const checkout = renderer
			.create(
				<BrowserRouter>
					<Checkout cart={mockCart} />
				</BrowserRouter>
			)
			.toJSON();
		expect(checkout).toMatchSnapshot();
	});

	test('triggers form submission when order is placed', async () => {
		const mockFn = jest.fn(e => e.preventDefault());
		const user = userEvent.setup();
		render(<Checkout submitOrder={mockFn} cart={[]} />);

		await act(async () => {
			await user.click(screen.getByText(/place order/i));
		});

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

});
