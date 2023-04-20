// import '../styles/Item.css';
import { useParams } from 'react-router-dom';

function ItemDetail({ items, addToCart }) {
	const params = useParams();
	const item = items.find(item => item.id == params.id)

	return (
		<div className='ItemDetail'>
			<img src={item.imgSrc} alt={item.name} />
			<div className='info'>
				<div className='item-name'>{item.name}</div>
				<div className='item-price'>${item.price}</div>
			</div>
			<button
				className='btn-filled'
				onClick={() => addToCart(item.id)}
			>
				Add to cart
			</button>
		</div>
	);
}

export default ItemDetail;