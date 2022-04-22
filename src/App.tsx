import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';

function App(): JSX.Element {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
			</Routes>	
		</BrowserRouter>
	);
}

export default App;
