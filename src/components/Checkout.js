import React from 'react';
import CartItem from './CartItem';
import '../styles/Checkout.css';

export default function Checkout(props) {
	const { cart, removeFromCart, submitOrder, updateQuantity, totalPrice } = props;

	const deliveryInfo = (
		<fieldset className='delivery-info'>
			<legend>Delivery</legend>
			<div className='form-rows'>
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
			</div>
		</fieldset>
	);

	const paymentInfo = (
		<fieldset className='payment-info'>
			<legend>Payment</legend>
			<div className='form-rows card-info'>
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
					{items}

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
