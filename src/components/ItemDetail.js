// import '../styles/Item.css';

function ItemDetail(props) {
  const { item, addToCart } = props;
  
  return (
		<div className='ItemDetail'>
			<h1>hi</h1>
			{/* <div className='item-name'>{item.name}</div>
			<div className='item-price'>${item.price}</div>
			<button
				className='btn-filled btn-small btn-shop-item'
				onClick={() => addToCart(item.id)}
			>
				Add to cart
			</button> */}
		</div>
	);
}

export default ItemDetail;
