import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from'./components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

import './App.css';



const particlesOptions = {
  particles: {
    number: {
      value: 180,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


const InitiState = {
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn:false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:''
      }    
  }


class App extends Component {
  constructor(){
    super();
    this.state=InitiState
  }

  loadUser =(data)=>{
    this.setState({ user: {
            id:data.id,
            name:data.name,
            email:data.email,
            entries:data.entries,
            joined:data.joined
          }
        })
  }
  
  calculateFaceLocation = (data) => {
  
  const cfFaceObj = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  
  const width = Number(image.width);
  const height = Number(image.height);
  return {
      leftCol: cfFaceObj.left_col * width,
      topRow: cfFaceObj.top_row * height,
      rightCol: width - (cfFaceObj.right_col * width),
      bottomRow: height - (cfFaceObj.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{

    this.setState({imageUrl: this.state.input});

    fetch('http://localhost:3001/imageurl',{
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
              input: this.state.input
            })
          })
          .then(response => response.json())
          .then(response =>  {
            if(response){
              fetch('http://localhost:3001/image',{
                method: 'put',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count => {
                    this.setState(Object.assign(this.state.user, {entries:count}))
                })
                .catch(console.log)
              
            }

        this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(err => console.log(err)    
    );
  }

  onRouteChange = (route) =>{
    
    if(route === 'signout')
    {
      this.state=InitiState
      //this.setState({isSignedIn: false});
    }
    else if(route === 'home')
    {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route });
  }


  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions} />
        
        <Grid>
          <Row>
            <Col sm={3}> <Logo />      </Col>
            <Col sm={9}> <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>      </Col>
          </Row>
          
          { route === 'home' 
            ?<div>          
                <Row>
                  <Col sm={12}><Rank name={this.state.user.name} entries={this.state.user.entries} /></Col>
                </Row>
                <Row>
                  <Col sm={3}>  </Col>
                  <Col sm={6}> <ImageLinkForm 
                                  onInputChange={this.onInputChange}
                                  onButtonSubmit={this.onButtonSubmit}
                               />      
                  </Col>   
                  <Col sm={3}>  </Col>         
                </Row>
                <Row>
                <Col sm={3}>  </Col> 
                  <Col sm={6}><FaceRecognition box={box} imageUrl={imageUrl} /></Col>
                <Col sm={3}>  </Col> 
                </Row>               
              </div>
            :(route === 'signin' || route === 'signout') 
              ? <div>
                  <Row>            
                    <Col sm={3}></Col>
                    <Col sm={9}><SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /></Col>
                    <Col sm={3}></Col>
                  </Row>
                </div>
              : <div>
                  <Row>            
                    <Col sm={3}></Col>
                    <Col sm={9}><Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /></Col>
                    <Col sm={3}></Col>
                  </Row>
                </div>

          }

        

        </Grid>
          
          
      </div>
    );
  }
}

export default App;
