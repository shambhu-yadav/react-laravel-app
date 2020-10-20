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
    axios.get('http://localhost:8000/edit-data/'+id)
    .then(response => {
        this.setState({ title: response.data.title, body: response.data.body });
    })
    .catch(function(error) {
        console.log(error);
    })
  }

  handleUpdateItem (event) {
    event.preventDefault();
    const id=this.props.match.params.id;

    const { title,body } = event.target

    const { history } = this.props

    const data = {
      title: title.value,
      body: body.value,
    }

    axios.put('http://localhost:8000/save-data/'+id)
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
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
                          defaultValue={this.state.name}
                          ref={this.input}
                        />
                        {this.renderErrorFor('first_name')}
                      </div>
                      
                      <div className='form-group'>
                        <label htmlFor='body'> Phone </label>
                        <textarea
                          id='phone'
                          className={`form-control ${this.hasErrorFor('phone') ? 'is-invalid' : ''}`}
                          name='phone'
                          rows='10'
                          defaultValue={this.state.phonr}
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

    export default SampleEdit