import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn)
	{
		return (
			<nav style={{display: 'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteChange('signout')}>Sign Out</p>
			</nav>
		);
	}
	else{
		return (
			<nav style={{display: 'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteChange('signin')}>Sign In</p>&nbsp;|&nbsp;				
				<p onClick={()=>onRouteChange('register')}>Register</p>
			</nav>
		);
	}
	
}

export default Navigation;