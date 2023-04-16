import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Home from './Home';
import renderer from 'react-test-renderer';

describe('Home', () => {
	test('renders correctly', () => {
		const home = renderer
			.create(
				<Router>
					<Home />
				</Router>
			)
			.toJSON();
		expect(home).toMatchSnapshot();
	});

	test(`routes to shop page when 'shop now' is clicked`, async () => {
		render(
			<Router>
				<Home />
			</Router>
		);

		expect(window.location.pathname).toBe('/');

		const user = userEvent.setup();
		const button = screen.getByRole('button', { name: /shop now/i });
		await act(async () => {
			await user.click(button);
		});
		expect(window.location.pathname).toBe('/shop');
	});
});
