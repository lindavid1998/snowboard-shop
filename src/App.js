import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import items from './data';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Home from './components/Home';

function App() {
	const [cart, setCart] = useState([]);
	const [isCartVisible, setIsCartVisible] = useState(false);
	const [category, setCategory] = useState('All');

	const openCart = () => {
		setIsCartVisible(true);
	};

	const hideCart = () => {
		setIsCartVisible(false);
	};

	const updateCategory = (category) => {
		setCategory(category.toLowerCase());
	};

	return (
		<Router>
			<div className='App'>
				<Nav openCart={openCart} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/shop'
						element={
							<Shop
								categoryShown={category}
								items={items}
								onClickMenu={updateCategory}
							/>
						}
					/>
				</Routes>
				<Cart cart={cart} isVisible={isCartVisible} hideCart={hideCart}></Cart>
			</div>
		</Router>
	);
}

export default App;
