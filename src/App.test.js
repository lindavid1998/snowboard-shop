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

	test('adds item to cart as new item if it does not already exist in cart', async () => {
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
		let cartItems;
		let quantities;
		let names;

		render(
			<MemoryRouter initialEntries={['/shop/0']}>
				<App items={mockItems} />
			</MemoryRouter>
		);

		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});
		cartItems = screen.getAllByTestId('cart-item');
		quantities = screen.getAllByTestId('quantity');
		names = screen.getAllByTestId('item-name');
		expect(cartItems.length).toBe(1);
		expect(names[0].textContent).toBe('item one');
		expect(quantities[0].value).toBe('1');
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
		quantities = screen.getAllByTestId('quantity');
		names = screen.getAllByTestId('item-name');
		expect(cartItems.length).toBe(2);
		expect(names[1].textContent).toBe('item two');
		expect(quantities[1].value).toBe('1');
		expect(screen.getByTestId('num-of-items').textContent).toBe('2');
	});

	test('increases qty of item in cart if it already exists in cart', async () => {
		const user = userEvent.setup();
		const mockItems = [
			{
				name: 'item one',
				id: 0,
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
		expect(screen.getByTestId('quantity').value).toBe('1');

		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});
		expect(screen.getAllByTestId('cart-item').length).toBe(1);
		expect(screen.getByTestId('item-name').textContent).toBe('item one');
		expect(screen.getByTestId('quantity').value).toBe('2');
		expect(screen.getByTestId('num-of-items').textContent).toBe('2');
	});

	test('removes item from cart without removing existing items', async () => {
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
			await user.click(screen.getByText('Shop'));
		});
		await act(async () => {
			await user.click(screen.getByText('item two'));
		});
		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});
		await act(async () => {
			await user.click(screen.getAllByText('Remove')[0]);
		});
		expect(screen.getAllByTestId('cart-item').length).toBe(1);
		expect(screen.getByTestId('item-name').textContent).toBe('item two');
		expect(screen.getByTestId('quantity').value).toBe('1');
		expect(screen.getByTestId('num-of-items').textContent).toBe('1');
	});

	test('correctly calculates total price in cart', async () => {
		const user = userEvent.setup();
		const mockItems = [
			{
				id: 0,
				name: 'item-one',
				price: 10,
				qty: 2,
			},
			{
				id: 1,
				name: 'item-two',
				price: 20,
				qty: 1,
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
			await user.click(screen.getByText('Add to cart'));
		});
		await act(async () => {
			await user.click(screen.getByText('Shop'));
		});
		await act(async () => {
			await user.click(screen.getByText('item-two'));
		});
		await act(async () => {
			await user.click(screen.getByText('Add to cart'));
		});

		expect(screen.getByTestId('total-price').textContent).toBe('Total: $40');
	});
});
