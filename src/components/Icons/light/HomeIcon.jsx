const HomeIcon = ({ color }) => (
	<svg
		width='14'
		height='15'
		viewBox='0 0 14 15'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M13.6355 13.7526C13.6355 13.9509 13.561 14.1409 13.4284 14.2811C13.2958 14.4213 13.1159 14.5 12.9284 14.5H1.61527C1.42775 14.5 1.2479 14.4213 1.1153 14.2811C0.982698 14.1409 0.908203 13.9509 0.908203 13.7526V5.89793C0.908129 5.78404 0.93268 5.67164 0.979982 5.56931C1.02728 5.46699 1.09609 5.37744 1.18113 5.30751L6.8377 0.657463C6.96182 0.555408 7.11459 0.5 7.27184 0.5C7.42909 0.5 7.58186 0.555408 7.70598 0.657463L13.3625 5.30751C13.4476 5.37744 13.5164 5.46699 13.5637 5.56931C13.611 5.67164 13.6356 5.78404 13.6355 5.89793V13.7526ZM12.2213 13.0053V6.26264L7.27184 2.19403L2.32234 6.26264V13.0053H12.2213Z'
			fill={color || 'black'}
		/>
	</svg>
);

export default HomeIcon;