import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import '@testing-library/jest-dom';

describe('Cart', () => {
	test('renders cart items', async () => {
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
    render(<Cart cart={mockCart} />);

    const cart = screen.getAllByRole('listitem')
    expect(cart.length).toBe(2);
	});
});
