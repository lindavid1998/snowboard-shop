import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Home from './components/Home';

function App(props) {
	const { items } = props;
	const [cart, setCart] = useState([]);
	const [isCartVisible, setIsCartVisible] = useState(false);

	const openCart = () => {
		setIsCartVisible(true);
	};

	const hideCart = () => {
		setIsCartVisible(false);
	};

	const handleAddToCart = (itemID) => {
		let item = items.find((item) => item.id === itemID);
		setCart(cart.concat([item]));
	};

	return (
		<div className='App'>
			<Nav openCart={openCart} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/shop'
					element={<Shop items={items} handleAddToCart={handleAddToCart} />}
				/>
			</Routes>
			<Cart cart={cart} isVisible={isCartVisible} hideCart={hideCart}></Cart>
		</div>
	);
}

export default App;
