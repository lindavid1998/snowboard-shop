import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';

function App(props) {
	const { items } = props;
	const [cart, setCart] = useState([]);
	const [isCartVisible, setIsCartVisible] = useState(false);

	const navigate = useNavigate();

	const openCart = () => {
		setIsCartVisible(true);
	};

	const hideCart = () => {
		setIsCartVisible(false);
	};

	const addToCart = (itemID) => {
		let item = items.find((item) => item.id === itemID);
		setCart(cart.concat([item]));
	};

	const removeFromCart = (itemID) => {
		let newCart = cart.filter((item) => item.id !== itemID);
		setCart(newCart);
	};

	const submitOrder = (e) => {
		e.preventDefault();
		setCart([]);
		navigate('/confirmation');
	};

	return (
		<div className='App'>
			<Nav openCart={openCart} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/shop'
					element={<Shop items={items} addToCart={addToCart} />}
				/>
				<Route
					path='/checkout'
					element={
						<Checkout
							cart={cart}
							removeFromCart={removeFromCart}
							submitOrder={submitOrder}
						/>
					}
				/>
				<Route path='/confirmation' element={<Confirmation />} />
			</Routes>
			<Cart
				cart={cart}
				isVisible={isCartVisible}
				hideCart={hideCart}
				removeFromCart={removeFromCart}
			/>
		</div>
	);
}

export default App;
