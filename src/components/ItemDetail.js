import '../styles/item-card.css';
import '../styles/ItemDetail.css';
import { useParams } from 'react-router-dom';

function ItemDetail({ items, addToCart }) {
	const params = useParams();
	const item = items.find((item) => item.id === Number(params.id));

	return (
		<div className='ItemDetail'>
			<img src={item.imgSrc} alt={item.name} />
			<div className='info'>
				<div className='item-name'>{item.name}</div>
				<div className='item-price'>${item.price}</div>
				<div className='delivery-time'>
					Delivery time (expected): 4-6 working days
				</div>
				<button
					className='btn-filled btn-medium btn-orange-fill'
					onClick={() => addToCart(item.id)}
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}

export default ItemDetail;
