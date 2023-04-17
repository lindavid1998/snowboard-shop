import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Confirmation from './Confirmation';

describe('Confirmation', () => {
  test('renders thank you message', () => {
		const page = renderer
			.create(
				<Router>
					<Confirmation />
				</Router>
			)
			.toJSON();
		expect(page).toMatchSnapshot();
	});

  test('routes to shop page', async () => {
    const user = userEvent.setup();
    render(
			<Router>
				<Confirmation />
			</Router>
    );
    
    await act(async () => {
      await user.click(screen.getByText(/shop more/i));
		});
		expect(window.location.pathname).toBe('/shop');
  });
});
