import React from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Checkout(props) {
	const { cart, removeFromCart } = props;

	const deliveryInfo = (
		<fieldset>
			<legend>Delivery</legend>
			<div className='form-row'>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' />
			</div>
			<div className='form-row'>
				<label htmlFor='name'>Address</label>
				<input type='text' id='address' name='address' />
			</div>
			<div className='form-row'>
				<label htmlFor='name'>City</label>
				<input type='text' id='city' name='city' />
			</div>
			<div className='form-row'>
				<label htmlFor='name'>State</label>
				<input type='text' id='state' name='state' />
			</div>
			<div className='form-row'>
				<label htmlFor='name'>ZIP Code</label>
				<input type='text' id='zip' name='zip' />
			</div>
		</fieldset>
	);

	const paymentInfo = (
		<fieldset>
			<legend>Payment</legend>
			<div className='form-row'>
				<label htmlFor='name'>Name on card</label>
				<input type='text' id='name' name='name' />
			</div>
			<div className='form-row'>
				<label htmlFor='name'>Card number</label>
				<input type='text' id='card-number' name='card-number' />
			</div>
			<div className='form-row'>
				<label htmlFor='name'>Expiration date</label>
				<input type='text' id='exp-date' name='exp-date' />
			</div>
		</fieldset>
	);

	const items = (
		<fieldset>
			<legend>Cart</legend>
			{cart.map((item) => (
				<CartItem
					item={item}
					key={item.id}
					className='cart-item checkout'
					removeFromCart={removeFromCart}
				/>
			))}
		</fieldset>
  );
  
  const totalPrice = cart.reduce((acc, cur) => acc + cur.price, 0)

  const orderSummary = (
		<div className='order-summary'>
			<div className='total'>Total: {`$${totalPrice}`}</div>
			<Link to='/confirmation'>
				<input type='submit' value='Place Order' />
			</Link>
		</div>
	);

	return (
		<div className='Checkout'>
			<form action=''>
				{deliveryInfo}
				{paymentInfo}
				{items}
        {orderSummary}
			</form>
		</div>
	);
}
