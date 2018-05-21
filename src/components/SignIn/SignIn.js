import React from 'react';
import './SignIn.css';

class SignIn extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignin = () => {
		fetch('http://localhost:3001/signin',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
			else{
				alert('Invalid username and password!!!')
			}
		})
	}

		
	

	render(){
		const { onRouteChange } = this.props; 
		return(
			<div className='container'>			 
				<div style={{border: '2px solid #ffffff'}}>
				    <div className="form-group">
					    <div className="col-sm-12">
					      <div className="col-sm-3">
					      	<label htmlFor="email">Email:</label>
					      </div>			      
					      <div className="col-sm-9" >
					        <input type="text" className="form-control" id="email" 
					        		placeholder="Enter email" name="email"
					        		onChange={this.onEmailChange} 
					        />
					      </div>
					    </div>

					    <div className="col-sm-12">
					    	<div className="col-sm-3">
					      		<label className="control-label">Password:</label>
					      	</div>
					      	<div className="col-sm-9">          
					       		<input type="password" className="form-control" id="pwd" 
					       			placeholder="Enter password" name="pwd" 
					       			onChange={this.onPasswordChange}
					       		/>
					      	</div>
					    </div>

					    
					    <div className="form-group">        
					      	<div className="col-sm-offset-2 col-sm-12">
						      	<br />
						        <input onClick={ this.onSubmitSignin } 
						        	type="submit" className="btn btn-default" value="Sign In" />
					     	</div>
				    	</div>
				    	<div className="form-group">        
					      	<div className="col-sm-offset-2 col-sm-12">
					        	<p onClick={() =>onRouteChange('register')}>Register</p>
					     	</div>
				    	</div>
				    </div>			    
			  	</div>
			</div>
		);
	}
}
export default SignIn;