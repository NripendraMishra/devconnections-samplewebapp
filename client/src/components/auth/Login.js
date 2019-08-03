import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { EmailI, PasswwordI } from '../layouts/Form';
import { userLogin, userEmail, userPassword } from '../../actions/authActions';
import { connect } from 'react-redux';
// import store from '../../store';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            errors : {}
        }

        this.onSubmit = this.onSubmit.bind(this)
       
    }

    onSubmit (e){
        this.props.userLogin(this.props.auth.user, this.props.history)
        this.setState({ errors: {} });
        e.preventDefault()
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps){
       
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
          }
    }

    render() {
        return (
            <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Login</h1>
                <p className="lead text-center">Signin into your connector account</p>
                <form  onSubmit={this.onSubmit}>
                        <EmailI state={this.state}/>  
                        <PasswwordI state={this.state}/>
                <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

Login.protoTypes = {
    userLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {userLogin, userEmail, userPassword}) (Login) 