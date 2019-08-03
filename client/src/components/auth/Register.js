import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {NameI,  EmailI, PasswwordI ,Password2I } from '../layouts/Form';

import { connect } from 'react-redux';
import { registerUser, userName, userEmail, userPassword, userPassword2 } from '../../actions/authActions';

class Register extends Component {

    constructor() {
        super()
        this.state = {
            errors : {}
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit (e){
        e.preventDefault()
        this.props.registerUser(this.props.auth.user, this.props.history)
        
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
          }
    }

    render() {
        return (
            <>
        <div className="register">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
               {/* <h2> {props.props.errors.user ? props.props.errors.user.message : ''}</h2> */}
                <p className="lead text-center">Create your DevConnector account</p>
               
               
                <form onSubmit={this.onSubmit}>
                        <NameI  state={this.state}/>
                        <EmailI state={this.state}/>  
                        <PasswwordI state={this.state}/>
                        <Password2I state={this.state}/>
                <input type="submit" className="btn btn-info btn-block mt-4" />
                
                </form>
                </div>
            </div>
            </div>
        </div>
        
        </>
        )
    }
}

Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.auth,
    errors: state.errors
})

// export default Register
export default connect(mapStateToProps, {registerUser, userName, userEmail, userPassword, userPassword2}) (withRouter(Register))
