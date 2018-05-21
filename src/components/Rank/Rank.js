import React from 'react';
import './Rank.css'; 

const Rank=({name, entries}) =>{
	return (
		<div className='rankText'>
			<div>{ `Hello ${name} Your current rank is.... ` }</div>
			<div style={{color:'white' }}>{entries}</div>
		</div>

		);
}

export default Rank;