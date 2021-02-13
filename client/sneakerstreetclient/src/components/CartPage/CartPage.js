import React, { useEffect, useState } from 'react';
import './cartpage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RemovefromCart } from '../../redux/actions/userActions';

function CartPage() {
	const uemail = useSelector((state) => state.userR.email);
	const allproducts = useSelector((state) => state.productR.allproducts);
	const cart = useSelector((state) => state.userR.cart);

	const [Cartproducts, setCartproducts] = useState([]);
	let allcartproducts = [];

	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		console.log(cart);
		cart.forEach((productID) => {
			allproducts.filter((item) => {
				if (item._id === productID) {
					allcartproducts.push(item);
				}
			});
		});
		setCartproducts(allcartproducts);
	}, [cart]);

	useEffect(() => {
		console.log(Cartproducts);
	}, [Cartproducts]);

	const Remove = (itemid) => {
		const requireddetails = {
			uemail,
			productid: itemid,
			type: 'REMOVE',
		};
		dispatch(RemovefromCart(requireddetails));
	};

	const displayALLproductDIV = Cartproducts.map((product) => (
		<div key={product._id} className='product-container'>
			<div className='product-left'>
				<div className='product-img'>
					<img src={product.Images[0]} alt={product.Name} />{' '}
				</div>
				<div className='product-deets'>
					<div className='name'>{product.Name}</div>
					<div>
						<span>Color :</span> {product.Details.Color}
					</div>
					<div>
						<span>Brand :</span> {product.Details.Brand}
					</div>
					<button
						onClick={(e) => {
							Remove(product._id);
						}}>
						Remove
					</button>
				</div>
			</div>

			<div className='product-right'>Rs. {product.BuyNew}</div>
		</div>
	));

	return (
		<div className='cart-page'>
			<div className='cart-page-left'>
				<div className='my-cart-container'>
					<div className='cart-title'>My Cart</div>
					<div className='cart-all-products'>{displayALLproductDIV}</div>
				</div>
			</div>
			<div className='cart-page-right'></div>
		</div>
	);
}

export default CartPage;
