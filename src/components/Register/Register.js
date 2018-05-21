import React from 'react';
import './Register.css';

class Register extends React.Component{
		constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onSubmitRegister = () => {
		if(!this.state.email || !this.state.name || !this.state.password ){
			alert('Please enter all details!!!')
			return;
		}
		fetch('http://localhost:3001/register',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
			else{
				alert('User not created !!!')
			}
		})
	}

	render(){
		
		return(
		<div>
			<div className="container"> 
			  <div style={{border: '2px solid #ffffff'}}>
			    <div className="form-group">

			    	
				   	<div className="col-sm-12">
				    	<div className="col-sm-3">
				      		<label className="control-label">Enter Name</label>
				      	</div>
				      	<div className="col-sm-9">          
				       		<input type="text" className="form-control" id="name" 
					       		placeholder="Enter Name" name="name"
					       		onChange={this.onNameChange} 
				       	 />
				      	</div>
				    </div>

				    <div className="col-sm-12">
				      <div className="col-sm-3">
				      	<label htmlFor="email">Email:</label>
				      </div>			      
				      <div className="col-sm-9" >
				        <input type="text" className="form-control" id="email" 
				        		placeholder="Enter email" 
				        		name="email"
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
				        <input onClick={ this.onSubmitRegister } 
				        	type="submit" 
				        	className="btn btn-default" 
				        	value="Register" />
				     </div>
			    	</div>
			    	
			    </div>			    
			  </div>
			</div>
		</div>
		);
	}
}


export default Register;