import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return (
		<div className=''>
			<p>{'This magic brain will detect your face in picture.Give it a try.' }</p>
			<div className='form'>
				<input type='text' className='txt' onChange={onInputChange} />
				<button 
					className='btn' 
					onClick={onButtonSubmit}>Detect</button>
			</div>
		</div>
		);
}

export default ImageLinkForm;