import { Link } from "react-router-dom";
import '../styles/Confirmation.css'

export default function Confirmation() {
  return (
		<div className='Confirmation'>
			<h2>Your order is confirmed!</h2>
			<h3>Thank you</h3>
			<Link to='/shop'>
				<button className='btn-translate-on-hover btn-filled btn-medium'>
					Shop More
				</button>
			</Link>
		</div>
	);
}