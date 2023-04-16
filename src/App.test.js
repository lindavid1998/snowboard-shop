import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

describe('App', () => {
	test('shows and hides cart', async () => {
		render(<App />);

		const user = userEvent.setup();
		const cart = screen.getByTestId('cart-component');
		const cartBtn = screen.getByRole('listitem', { name: /cart/i });

		expect(cart).toHaveClass('cart hidden');
		await act(async () => {
			await user.click(cartBtn);
		});
		expect(cart).toHaveClass('cart');

		const closeBtn = screen.getByRole('button', { name: /close/i });
		await act(async () => {
			await user.click(closeBtn);
		});

		expect(cart).toHaveClass('cart hidden');
	});
});
