import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import ItemDetail from './components/ItemDetail';

function App(props) {
	const { items } = props;
	const [cart, setCart] = useState([]);
	const [isCartVisible, setIsCartVisible] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	const navigate = useNavigate();

	const getTotalPrice = (cart) => {
		return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
	};

	const openCart = () => {
		setIsCartVisible(true);
	};

	const hideCart = () => {
		setIsCartVisible(false);
	};

	const addToCart = (itemID) => {
		let newCart = [...cart];
		let item = items.find((item) => item.id === itemID);
		let index = newCart.findIndex((item) => item.id === itemID);

		index !== -1
			? (newCart[index].quantity += 1)
			: newCart.push({ ...item, quantity: 1 });

		let newTotal = getTotalPrice(newCart);

		setCart(newCart);
		setTotalPrice(newTotal);
	};

	const removeFromCart = (itemID) => {
		let newCart = cart.filter((item) => item.id !== itemID);
		let newTotal = getTotalPrice(newCart);

		setCart(newCart);
		setTotalPrice(newTotal);
	};

	const updateQuantity = (itemID, newQty) => {
		let newCart = [...cart];
		let index = newCart.findIndex((item) => item.id === itemID);
		newCart[index].quantity = Number(newQty);

		let newTotal = getTotalPrice(newCart);
		setCart(newCart);
		setTotalPrice(newTotal);
	};

	const submitOrder = (e) => {
		e.preventDefault();
		setCart([]);
		setTotalPrice(0);
		navigate('/confirmation');
	};

	const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

	return (
		<div
			className={isCartVisible ? 'App dimmed' : 'App'}
			onClick={(e) => {
				if (e.target.classList.contains('dimmed')) {
					hideCart();
				}
			}}
		>
			<Nav openCart={openCart} totalItems={totalItems} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/shop' element={<Shop items={items} />} />
				<Route
					path='/shop/:id'
					element={<ItemDetail items={items} addToCart={addToCart} />}
				/>
				<Route
					path='/checkout'
					element={
						<Checkout
							cart={cart}
							removeFromCart={removeFromCart}
							submitOrder={submitOrder}
							updateQuantity={updateQuantity}
							totalPrice={totalPrice}
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
				updateQuantity={updateQuantity}
				totalPrice={totalPrice}
			/>
		</div>
	);
}

export default App;
