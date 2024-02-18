import React from 'react'
import '../styles/Promo.css';
import bCorpLogo from '../images/B-Corp-Logo-Black-RGB.webp';

const Promo = () => {
  return (
		<div className='promo'>
			<div className='promo-text'>
				<img src={bCorpLogo} alt='B-Corp Logo' />
				<h2>B Corp Recertification</h2>
				<p>
					We are proud to share that we have successfully renewed our B Corp
					Certification, reaffirming our dedication to our people, our planet,
					and our sport.
				</p>
			</div>
		</div>
	);
}

export default Promo