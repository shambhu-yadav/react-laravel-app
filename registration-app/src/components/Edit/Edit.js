import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


  class Edit extends Component { 
    constructor (props) {
    super(props)
   
    this.state = {
      first_name: '',
      phone: '',
      errors: []
    }

    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
    this.input = React.createRef();  
  }

  componentDidMount(){
    const id=this.props.match.params.id;
    console.log(id); 
    const url ="http://localhost:8000/api/edit-data/"+id; 
    console.log(url);
    axios.get(url) 
    .then(response => {
        this.setState({ first_name: response.data.first_name, phone: response.data.phone });  
    })
    .catch(function(error) {
        console.log(error);
    })
  }

  handleUpdateItem (event) {
    event.preventDefault();
    const id=this.props.match.params.id;

    const { first_name,phone } = event.target

    const { history } = this.props

    const data = {
      first_name: first_name.value,
      phone: phone.value, 
    }
    console.log(data);
    axios.post('http://localhost:8000/api/save-data/'+id , data) 
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })      
    }

    hasErrorFor (field) {
      return !!this.state.errors[field]
    }

    renderErrorFor (field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className='invalid-feedback'>
            <strong>{this.state.errors[field][0]}</strong>
          </span>
        )
      }
    }

      render () {
        return (

          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-12'>

               <Link className='btn btn-primary btn-sm mb-3' to='/'>
                      Back to listing
                </Link>


                <div className='card'>
                  <div className='card-header'>Edit Item</div>
                  <div className='card-body'>
                    <form onSubmit={this.handleUpdateItem}>
                      
                      <div className='form-group'>
                        <label htmlFor='title'> Name</label>
                        <input
                          id='first_name'
                          type='text'
                          className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
                          name='first_name'
                          defaultValue={this.state.first_name}
                          ref={this.input}
                        />
                        {this.renderErrorFor('first_name')}
                      </div>
                      
                      <div className='form-group'>
                        <label htmlFor='body'> Phone </label>
                        <input
                          id='phone'
                          className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                          name='phone'
                          defaultValue={this.state.phone}
                         ref={this.input}
                        />
                        {this.renderErrorFor('phone')}
                      </div>
                      <button className='btn btn-primary'>Update</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    export default Edit 