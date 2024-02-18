import React from 'react'
import '../styles/Focus.css';
import bindingsImg from '../images/HG-Sellthrough-Bindings-HeroBanner-Desktop-IMG.webp';

const Focus = () => {
  return (
    <div className='focus'>
      <img src={bindingsImg}></img>
			<div className='focus-text'>
				<p>A LEGACY SINCE 1985</p>
				<h2>Strap Bindings</h2>
				<p>
					For over four decades, we have been at the forefront of
					revolutionizing snowboard bindings, offering riders unparalleled
					comfort, control, and performance.
				</p>
			</div>
		</div>
	);
}

export default Focus