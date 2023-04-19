import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shop from './Shop';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

describe('Shop', () => {
	test('displays subcategories as menu bar', () => {
		render(<Shop />);

		const menuBar = screen.getByTestId('menu-bar').children;
		expect(menuBar.length).toBe(4);
		expect(menuBar[0].textContent).toMatch(/all/i);
		expect(menuBar[1].textContent).toMatch(/boards/i);
		expect(menuBar[2].textContent).toMatch(/boots/i);
		expect(menuBar[3].textContent).toMatch(/bindings/i);
	});

	test('displays items based on category chosen', async () => {
		const user = userEvent.setup();
		const mockItems = [
			{
				id: 0,
				category: 'boots',
			},
			{
				id: 1,
				category: 'boards',
			},
			{
				id: 2,
				category: 'bindings',
			},
			{
				id: 3,
				category: 'boards',
			},
		];

		render(<Shop items={mockItems} />);
		expect(screen.getByTestId('items').children.length).toBe(4);

		await waitFor(() => {
			user.click(screen.getByText('Bindings'));
			expect(screen.getByTestId('items').children.length).toBe(1);
		});

		await waitFor(() => {
			user.click(screen.getByText('Boards'));
			expect(screen.getByTestId('items').children.length).toBe(2);
		});

		await waitFor(() => {
			user.click(screen.getByText('Boots'));
			expect(screen.getByTestId('items').children.length).toBe(1);
		});

		await waitFor(() => {
			user.click(screen.getByText('All'));
			expect(screen.getByTestId('items').children.length).toBe(4);
		});
	});

	test('shows active tab with styling', async () => {
		// render page
		const user = userEvent.setup();
		render(<Shop items={[]} />);

		// assert that 'all' is default styled as active
		expect(screen.getByText(/all/i)).toHaveClass('active');

		// click on tab
		await act(async () => {
			await user.click(screen.getByText(/boards/i));
		});

		// assert that only one tab is active
		expect(screen.getByText(/boards/i)).toHaveClass('active');
		expect(screen.getByText(/all/i)).not.toHaveClass('active');
		expect(screen.getByText(/bindings/i)).not.toHaveClass('active');
		expect(screen.getByText(/boots/i)).not.toHaveClass('active');
	});
});
