import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) =>{
	return(
		<div>
			<div className='imageStyle'>
				<img id='inputimage' alt='' src={imageUrl} width='550px' height='auto' />
				<div className='boundingBox' 
					style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
				</div>
			</div>
		</div>
		);
}

export default FaceRecognition;