import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";
import $ from 'jquery';
import {Card, CardBody, CardText, CardHeader, Container, Row, Col } from 'reactstrap';

export default class CreateTrainer extends Component {

    constructor(props){
      super(props);
      this.state={
        uid   : 1,
        name : '',
        course : '',
        qualification : '',
        experience : ''
      };
   
      this.myfunc = () => {
      }
    }
   
    handle(e)
    {
      
      e.preventDefault();
      let that = this
      $.post("http://localhost:5000/add",//using a ajax call
       {
        name : this.state.name,
        course : this.state.course,
        qualification : this.state.qualification,
        experience : this.state.experience
      }, function(list) {
        console.log('Data back ' + JSON.stringify(list));
        that.props.getUsers()
      });
      this.setState({
        name : '',
        course : '',
        qualification : '',
        experience : ''
      });
      
    }
  
    modify(event){
      this.setState({
        
        name : document.getElementById('name').value,
        course : document.getElementById('course').value,
        qualification : document.getElementById('qualification').value,
        experience : document.getElementById('experience').value
        
      })
    }
    render() {
      return (
       <div>
        
         <h1 className='header' >Add trainer</h1>
          <div className='topdiv' >    
          <Popup trigger={<button className="btn btn-info btn-lg" > Add</button>} modal position="right center" >
            {close => (
                <div className='modaldiv'>
                <div className='closebutton'>
                    <button className="btn btn-danger btn-lg"  onClick={()=> close()}>X</button>
                </div>
                <h1>Enter Trainer Details</h1>
                <div className='content'>
                <form onSubmit={(e) => {this.handle(e); close(); }}>
                    <div className='container'>
                    <label for="name"><b>Trainer name :</b></label><br/>
                        <input type="text" id="name" placeholder='Name' value={this.state.name} onChange={(event) =>{ this.modify(event)} }/> <br/>
                    <label for="course"><b>Trainer Course :</b></label><br/>
                    <input type="text" id="course" placeholder='Course' value={this.state.course} onChange={(event) =>{ this.modify(event)} }/>   <br/>
                    <label for="qualification"><b> Qualification  :</b></label><br/>
                    <input type="text" id="qualification" placeholder='Qualification' value={this.state.qualification} onChange={(event) =>{ this.modify(event)} }/> <br/> 
                    <label for="experience"><b>Experience  :</b></label><br/>
                    <input type="number" id="experience" placeholder='Experience' value={this.state.experience} onChange={(event) =>{ this.modify(event)} }/>   <br/>
                    <input type="submit" name="submit" value="Submit"  /> <br/>
                    </div>
                </form>
                </div>
                </div>
            )}
          </Popup>
          </div> 
          <br />
          <br />
          <br />
          <br />
          
          
       
        </div>
  
      );
    }
  }