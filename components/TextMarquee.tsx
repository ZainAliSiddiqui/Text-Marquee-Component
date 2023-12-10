"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function App() {
	const firstText = useRef(null);
	const secondText = useRef(null);
	const slider = useRef(null);
	let xPercent = 0;
	let direction = -1;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(slider.current, {
			scrollTrigger: {
				trigger: document.documentElement,
				scrub: 0.25,
				start: 0,
				end: window.innerHeight,
				onUpdate: (e) => (direction = e.direction * -1),
			},
			x: "-500px",
		});
		requestAnimationFrame(animate);
	}, []);

	const animate = () => {
		if (xPercent < -100) {
			xPercent = 0;
		} else if (xPercent > 0) {
			xPercent = -100;
		}
		gsap.set(firstText.current, { xPercent: xPercent });
		gsap.set(secondText.current, { xPercent: xPercent });
		requestAnimationFrame(animate);
		xPercent += 0.1 * direction;
	};

	return (
		<main className="relative flex h-screen mb-[100vh] overflow-hidden bg-black">
			<div className="absolute top-[calc(100vh-350px)]">
				<div
					ref={slider}
					className="relative whitespace-nowrap">
					<p
						className="relative m-0 text-white text-[230px] font-medium pr-[50px]"
						ref={firstText}>
						Freelance Developer -
					</p>
					<p
						className="relative m-0 text-white text-[230px] font-medium pr-[50px] even:absolute left-full top-0"
						ref={secondText}>
						Freelance Developer -
					</p>
				</div>
			</div>
		</main>
	);
}
