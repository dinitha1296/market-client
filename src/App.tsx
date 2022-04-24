import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { ProductsPage, HomePage } from './pages';

function App(): JSX.Element {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/products" element={<ProductsPage />} />
			</Routes>	
		</BrowserRouter>
	);
}

export default App;
