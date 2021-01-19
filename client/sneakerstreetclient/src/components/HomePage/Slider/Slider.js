import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineChevronLeft, HiChevronRight } from "react-icons/hi";
import { fetchall } from "../../../redux/actions/productActions";
import SliderItem from "../SliderItem/SliderItem";
import "./slider.scss";

function Slider() {
	const allproducts = useSelector((state) => state.productR.allproducts);
	const isloading = useSelector((state) => state.productR.isloading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchall());
	}, []);

	useEffect(() => {
		if (isloading == true) {
			console.log("Loading");
		} else {
			console.log(allproducts);
		}
	}, [isloading]);

	const [count, setCount] = useState(1);

	const SlideRight = () => {
		const slider = document.querySelector(".slider");
		if (count < 4) {
			setCount(count + 1);
		}
		if (count === 4) {
			slider.style.transform = `translate(-80%)`;
		} else {
			let slideamt = count * 20;
			//	console.log(slideamt);
			slider.style.transform = `translate(-${slideamt}%)`;
		}
	};

	const SlideLeft = () => {
		const slider = document.querySelector(".slider");
		let slideamt = (count - 2) * 20;
		if (count === 2) {
			slider.style.transform = `translate(1%)`;
		} else {
			slider.style.transform = `translate(-${slideamt}%)`;
		}
		if (count !== 2) {
			setCount(count - 1);
		}
		//	console.log(slideamt);
	};

	const allsliders = allproducts.map((item) => (
		<SliderItem
			key={item._id}
			allimages={item.Images}
			Name={item.Name}
			Price={item.BuyNew}
		/>
	));

	return (
		<div className='slider-container'>
			<div
				className='slide-left-btn'
				onClick={() => {
					SlideLeft();
				}}>
				<HiOutlineChevronLeft />{" "}
			</div>
			<div
				className='slide-right-btn'
				onClick={() => {
					SlideRight();
				}}>
				<HiChevronRight />
			</div>
			<div className='slider-wrapper'>
				<div className='slider'>{allsliders}</div>
			</div>
		</div>
	);
}

export default Slider;