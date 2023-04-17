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
			},
			{
				id: 1,
				name: 'GNU Young Money C2E Snowboard - Big Boys 2023',
				price: 279.99,
				category: 'boards',
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

  test('shows correct total price', () => {
		const mockCart = [
			{
				id: 0,
				name: 'item-one',
				price: 10,
			},
			{
				id: 1,
				name: 'item-two',
				price: 20,
			},
		];

		render(
			<BrowserRouter>
				<Checkout cart={mockCart} />
			</BrowserRouter>
    );
  
    expect(screen.getByText(/total/i).textContent).toBe('Total: $30')
	});

  test('routes to confirmation page when order is placed', async () => {
    const user = userEvent.setup();
    // render page
    const mockCart = [
			{
				id: 0,
				name: 'item-one',
				price: 10,
			}
		];

		render(
			<BrowserRouter>
				<Checkout cart={mockCart} />
			</BrowserRouter>
    );
    
    await act(async () => {
      await user.click(screen.getByText(/place order/i));
		});
		expect(window.location.pathname).toBe('/confirmation');

  });

	test.todo('can adjust quantities');
});
