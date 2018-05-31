import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";
import $ from 'jquery';
import {Card, CardBody, CardText, CardHeader, Container, Row, Col } from 'reactstrap';
import CreateTrainer from './CreateTrainer'

class Display extends Component {

  constructor(){
    super();
     this.state={
        list:[]
      };

      this.getUsers = () => { 
        $.ajax({ 
                url: "http://localhost:5000/add", 
                type : 'get', 
                dataType: 'json',
                success: (list) => { 
                     
                      this.setState({list : list});
                    },
                error: (xhr, status, err) => {
                          console.log("error1 "+err);
                        }
            });
        }
  }
  
  
  componentDidMount(){
    this.getUsers();
  }


  render(){
      return(
        <div>
          <CreateTrainer getUsers={this.getUsers} />
          <div className="App">
          <h1 className='trainerheader'>Trainers Names</h1><br/>
          <Container>
            <Row>
            {this.state.list.map(trainer =>
                <div>
                  <Col>
                  <MyCard value = {trainer} getUsers={this.getUsers}/>
                    <br/>
                  <br/>
                  </Col>  
                </div>
              )}
            </Row>
          </Container>
          <hr />
          <br />
          <br />
          </div>
      </div>
      );
    }
}

class MyCard extends Component {
  constructor(props){
    super(props);
  }
 
  deletefunc(e,uid)
  {
    e.preventDefault();
    let that=this;
    $.post("http://localhost:5000/del",
    {
       _id : uid
    }, function(msg) 
       {
         console.log(msg);
         that.props.getUsers();
          // onDelete(); 
       }); 
  }
  render(){
  return (
    <div className='mycard' >
    <Card>
      <CardBody>
        <CardHeader  className='cardheader'>
          <h2 style = {{fontWeight: 'bold' }}>Name: {this.props.value.name}</h2>
        </CardHeader>
        <CardText>
          <h4> <i>Course: </i> {this.props.value.course} </h4>
          <h4> <i>Qualification: </i> {this.props.value.qualification}</h4>
          <h4> <i>Experience:  </i>{this.props.value.experience}</h4>
        </CardText>
        <button className="btn btn-info btn-lg"  id={this.props.value._id} >edit</button> &nbsp; &nbsp; &nbsp;
        <button className="btn btn-danger btn-lg" id={this.props.value._id} 
        onClick={(e) => this.deletefunc(e,this.props.value._id)}
        >-</button>
      </CardBody>
    </Card>
    <br />
    <br/>
    </div>
  );
}
}



export default Display;
