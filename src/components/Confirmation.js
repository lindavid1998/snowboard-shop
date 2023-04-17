import { Link } from "react-router-dom";

export default function Confirmation(props) {
  return (
		<div className='Confirmation'>
			<div>Your order is confirmed!</div>
			<div>Thank you</div>
			<Link to='/shop'>
				<button className='btn-filled'>Shop More</button>
			</Link>
		</div>
	);
}