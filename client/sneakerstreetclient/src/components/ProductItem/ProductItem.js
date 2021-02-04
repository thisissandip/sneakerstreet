import React, { useState } from 'react';
import './productitem.scss';

function ProductItem({ allimages, Name, Price, pagename }) {
	const [Img, setImg] = useState(allimages[0]);

	const productClassname =
		pagename === 'homepage' ? 'product-item' : 'shop-item';

	return (
		<div
			onMouseOver={() => {
				if (pagename === 'shopall') {
					setImg(allimages[2]);
				}
			}}
			onMouseLeave={() => {
				if (pagename === 'shopall') {
					setImg(allimages[0]);
				}
			}}
			className={`${productClassname}`}>
			<div className='product-item-img-wrapper'>
				<img src={Img} alt={Name} />
			</div>
			<div className='product-item-details'>
				<div className='product-item-name'>{Name}</div>
				<div className='product-item-price'>$ {Price}</div>
			</div>
		</div>
	);
}

export default ProductItem;