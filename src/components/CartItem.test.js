import { render, screen } from '@testing-library/react';
import CartItem from './CartItem';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

describe('CartItem', () => {
	test('calls updateQuantity correctly', async () => {
		const mockFn = jest.fn();
		const mockItem = {
			price: 2,
			quantity: 2,
			id: 0,
		};
		render(<CartItem item={mockItem} updateQuantity={mockFn} />);
		await userEvent.type(screen.getByRole('spinbutton'), '3');
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith(mockItem.id, '23');
	});

  test('calls removeFromCart correctly', async () => {
    const mockFn = jest.fn();
		const mockItem = {
			price: 2,
			quantity: 2,
			id: 0,  
		};
    render(<CartItem item={mockItem} removeFromCart={mockFn} />);
    await userEvent.click(screen.getByText('Remove'));
		expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(mockItem.id);
  });
});
