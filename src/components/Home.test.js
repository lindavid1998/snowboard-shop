import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Home from './Home';

describe('Home', () => {
	test(`contains a 'shop now' button`, () => {
		// render page
		render(
			<Router>
				<Home />
			</Router>
		);

		// query for button
		let button = screen.getByRole('button', { name: /shop now/i });

		// assert that button says 'shop now'
		expect(button.textContent).toBe('Shop Now');
	});

	test(`routes to shop page when 'shop now' is clicked`, async () => {
		// render page
		render(<Router>
      <Home />
    </Router>);

		// assert that shop page is not displayed by default
		expect(window.location.pathname).toBe('/');

		// query for button
		let button = screen.getByRole('button', { name: /shop now/i });

		// simulate click
		const user = userEvent.setup();
		await act(async () => {
			await user.click(button);
		});

		// assert that shop page is displayed
		expect(window.location.pathname).toBe('/shop');
	});
});
