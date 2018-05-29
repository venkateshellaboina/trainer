import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";
import $ from 'jquery';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      name : '',
      course : '',
      experience : '',
      qualification : ''
    };
    
  }

  
  handle(e)
  {
    e.preventDefault();
    $.post("http://localhost:5000/add",//using a ajax call
     {
      name : this.state.name,
      course : this.state.course,
      experience : this.state.experience,
      qualification : this.state.qualification

    }, function(data) {
      console.log('Data back ' + JSON.stringify(data))
    })

    
  }
  modify(event){
    this.setState({
      name : document.getElementById('name').value,
      course : document.getElementById('course').value,
      experience : document.getElementById('experience').value,
      qualification : document.getElementById('qualification').value
    })
}
  render() {
    return (
     <div>
       <h1 className='header' >Add trainer: </h1>
        <div className='topdiv' >    
        <Popup trigger={<button className="btn btn-info btn-lg" > Add</button>} modal position="right center" >
          {close => (
          <div className='modaldiv'>
            <h1>Enter Trainer Details</h1>
            <div className='content'>
            <form >
              <div className='container'>
                <label for="name"><b>Trainer name :</b></label><br/>
 	             <input type="text" id="name" placeholder='Name' value={this.state.name} onChange={(event) =>{ this.modify(event)} }/> <br/>
                <label for="course"><b>Trainer Course :</b></label><br/>
                <input type="text" id="course" placeholder='Course' value={this.state.course} onChange={(event) =>{ this.modify(event)} }/>   <br/>
                <label for="qualification"><b> Qualification  :</b></label><br/>
                <input type="text" id="qualification" placeholder='Qualification' value={this.state.qualification} onChange={(event) =>{ this.modify(event)} }/> <br/> 
                <label for="experience"><b>Experience  :</b></label><br/>
                <input type="number" id="experience" placeholder='Experience' value={this.state.experience} onChange={(event) =>{ this.modify(event)} }/>   <br/>
                <input type="submit" name="submit" value="Submit"/><br/>
              </div>
             </form>
            </div>
            <div>
              <button
              className="button"
              onClick={() => {
              console.log('modal closed ')
              close()
              }}
              >
              close
              </button>
            </div>

          </div>
          )}
        </Popup>
          


        </div>
      
      </div>

    );
  }
}

export default App;
