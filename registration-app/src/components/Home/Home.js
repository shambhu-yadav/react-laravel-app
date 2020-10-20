import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Home.css";
export default class Home extends Component {
  state = {
    navigate: false,
    posts: [],
    isLoading: true,
    errors: null
  };

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };

 constructor(props) {
    super(props);
 
    this.state = {
      users:[] 
    };
  }

  componentDidMount() {
      axios.get("http://localhost:8000/api/users")
      .then(response =>  {
          this.setState({users:response.data}); 
        }) 
  }

  handleClick = userId => {
    const url = "http://localhost:8000/api/deleteuser/" + userId ; 
    console.log(url);
    axios
      .post(url) 
      .then(res => {
        this.setState(previousState => {
          window.location.reload(false);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

   getData(){
       axios.get('http://localhost:8000/api/edit-data').then(response => {
          this.setState({
              items: response.data
          }) 
      })
  };



  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div className="container">
      <div className="row" style={{marginTop: '12%'}}> 
      <div className="col-md-2">
      </div>
      <div className="col-md-8">
        <center><h3>HomePage</h3></center>
        <div className="row">
          <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
            <h5> Welcome, {user.first_name} </h5> You have Logged in successfully. 
          </div>
          <div className="col-xl-3 col-sm-12 col-md-3">
            <Button
              className="btn btn-primary text-right"
              onClick={this.onLogoutHandler}>
              Logout
            </Button>
          </div>
        </div>
        <div className="container">
          <center><h3>User Table</h3></center> 
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th> 
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.users.map(user=>{
                return(
                <tr>  
                <td>{user.first_name}</td> 
                <td>{user.email}</td>
                <td>{user.phone}</td> 
                <td>
                  <button className="btn btn-danger" onClick={() => { this.handleClick(user.id) }} >Delete</button> 
                  <Link className='btn btn-info' to={`Edit/${user.id}/edit`} key={user.id}> Edit </Link>  
                </td>
                </tr>  
                )
              })
            }
            </tbody>
          </table>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
