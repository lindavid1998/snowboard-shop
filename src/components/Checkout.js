import React from 'react';

export default function Checkout(props) {

  const deliveryInfo = (
		<fieldset>
			<legend>Delivery</legend>
			<div className='form-row'>
				<label for='name'>Name</label>
				<input type='text' id='name' name='name' />
			</div>
			<div className='form-row'>
				<label for='name'>Address</label>
				<input type='text' id='address' name='address' />
			</div>
			<div className='form-row'>
				<label for='name'>City</label>
				<input type='text' id='city' name='city' />
			</div>
			<div className='form-row'>
				<label for='name'>State</label>
				<input type='text' id='state' name='state' />
			</div>
			<div className='form-row'>
				<label for='name'>ZIP Code</label>
				<input type='text' id='zip' name='zip' />
			</div>
		</fieldset>
	);
  
  const paymentInfo = (
		<fieldset>
			<legend>Payment</legend>
			<div className='form-row'>
				<label for='name'>Name on card</label>
				<input type='text' id='name' name='name' />
			</div>
			<div className='form-row'>
				<label for='name'>Card number</label>
				<input type='text' id='card-number' name='card-number' />
			</div>
			<div className='form-row'>
				<label for='name'>Expiration date</label>
				<input type='text' id='exp-date' name='exp-date' />
			</div>
		</fieldset>
  );
  
  const items = (
		<fieldset>
      <legend>Cart</legend>
      {/* List out cart items */}
		</fieldset>
	);
	return (
		<div className='Checkout'>
			<form action=''>
				{deliveryInfo}
        {paymentInfo}
        {items}
				<input type='submit' value='Place Order' />
			</form>
		</div>
	);
}
