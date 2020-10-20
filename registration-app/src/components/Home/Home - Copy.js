import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

// import "./Home.css";
export default class Home extends Component {
  state = {
    navigate: false,
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
      hits: [],
    };
  }

  componentDidMount() {
   

      fetch("http://localhost:8000/api/users")
      .then(response => response.json())
      .then(data => console.log(data));

  }



  render() {
    const { hits } = this.state;
    console.log(hits.first_name); 
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div className="container  border">
        <h3> HomePage</h3>
        <div className="row">
          <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
            <h5> Welcome,  </h5> You have Logged in
            successfully.
          </div>
          <div className="col-xl-3 col-sm-12 col-md-3">
            <Button
              className="btn btn-primary text-right"
              onClick={this.onLogoutHandler}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="container">
  <h2>User Table</h2>
  <table className="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
</div>
      </div>
    );
  }
}