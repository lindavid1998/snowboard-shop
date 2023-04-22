import React from 'react';
import CartItem from './CartItem';
import '../styles/Checkout.css';

export default function Checkout(props) {
	const { cart, removeFromCart, submitOrder, updateQuantity, totalPrice } =
		props;

	const deliveryInfo = (
		<fieldset className='delivery-info'>
			<legend>Delivery</legend>
			<div className='form-rows'>
				<div className='form-row'>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' />
				</div>

				<div className='form-row'>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' name='email' />
					<div className='error-message'>Please enter a valid email</div>
				</div>

				<div className='form-row'>
					<label htmlFor='address'>Address</label>
					<input type='text' id='address' name='address' />
				</div>

				<div className='form-row'>
					<label htmlFor='city'>City</label>
					<input type='text' id='city' name='city' />
				</div>

				<div className='form-row'>
					<label htmlFor='state'>State</label>
					<input type='text' id='state' name='state' />
				</div>

				<div className='form-row'>
					<label htmlFor='zip'>ZIP Code</label>
					<input
						type='text'
						id='zip'
						name='zip'
						pattern='^\d{5}(?:[-\s]\d{4})?$'
					/>
					<div className='error-message'>Please enter a valid ZIP</div>
				</div>
			</div>
		</fieldset>
	);

	const paymentInfo = (
		<fieldset className='payment-info'>
			<legend>Payment</legend>
			<div className='form-rows card-info'>
				<div className='form-row'>
					<label htmlFor='name-on-card'>Name on card</label>
					<input type='text' id='name' name='name-on-card' />
				</div>

				<div className='form-row'>
					<label htmlFor='card-number'>Card number</label>
					<input
						type='text'
						id='card-number'
						name='card-number'
						pattern='^[0-9]+$'
					/>
					<div className='error-message'>Please enter a valid card number</div>
				</div>

				<div className='form-row'>
					<label for='expiration-date'>Expiration date</label>
					<input
						type='month'
						id='expiration-date'
						name='expiration-date'
						min='2023-04'
						max='2030-12'
					/>
				</div>
			</div>
		</fieldset>
	);

	const items = (
		<fieldset className='checkout-cart-items'>
			<legend>Cart</legend>
			{cart.map((item) => (
				<CartItem
					item={item}
					key={item.id}
					className='cart-item checkout'
					removeFromCart={removeFromCart}
					updateQuantity={updateQuantity}
				/>
			))}
		</fieldset>
	);

	return (
		<div className='Checkout'>
			<form className='checkout-form' onSubmit={submitOrder}>
				<div className='customer-info'>
					{deliveryInfo}
					{paymentInfo}
				</div>

				<div className='order-info'>
					{cart.length !== 0 ? (
						items
					) : (
						<div className='empty-cart-message'>Your cart is empty</div>
					)}

					<div className='total'>
						<div className='total-label'>Total:</div>
						<div className='total-price'>${totalPrice}</div>
					</div>

					<button type='submit' className='btn-filled btn-place-order'>
						Place Order
					</button>
				</div>
			</form>
		</div>
	);
}
