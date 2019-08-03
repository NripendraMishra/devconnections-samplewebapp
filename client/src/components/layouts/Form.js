import React, { Component } from 'react'
import { connect } from 'react-redux';
import classnames from 'classnames';
import { userName, userEmail, userPassword, userPassword2 } from '../../actions/authActions';

class NameInput extends Component{
    constructor(props){
        super(props)
         this.state = {
             name: '',
             errors: {}
         }

         this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.state.errors) {
            this.setState({ errors: nextProps.state.errors });
          }
    }

    onChange(e){
        e.preventDefault()
        this.setState({
            name: e.target.value
        }, () => {this.props.userName(this.state.name)})
    }

    render(){
       
        return (
            <>
            <div className="form-group">
                 <input type="text" placeholder="Name"  onChange={this.onChange} 
                 className='form-control form-control-lg'  required />
                {/* <label>{this.state.errors ?this.state.errors.errors.name : ''}</label> */}
             </div>
             </>
        )
    }
}

 class EmailInput extends Component{
    constructor(props){
        super(props)
         this.state = {
             email: '',
             errors: {}
         }

         this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.state.errors) {
            this.setState({ errors: nextProps.state.errors });
          }
    }

    onChange(e){
        console.log(this.state)
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        }, () => {this.props.userEmail(this.state.email)})
    }

    render(){
        const { errors } = this.state
        return (
            <div className="form-group">
                <input type="email" placeholder="Email Address" 
                name="email"
                onChange={this.onChange}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                required/>
                {errors ? errors.email : ''}
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
        )
    }
}

class PasswordInput extends Component{
    constructor(props){
        super(props)
         this.state = {
             password: '',
             errors: {}
         }

         this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.state.errors) {
            this.setState({ errors: nextProps.state.errors });
          }
    }

    onChange(e){
        e.preventDefault()
        this.setState({
            password: e.target.value
        }, () => {this.props.userPassword(this.state.password)})
    }

    render(){
      
        return (
            <div className="form-group">
          <input type="password" placeholder="Password"  onChange={this.onChange} className="form-control form-control-lg"  name="password" required/>
          {this.state.errors.user ? this.state.errors.user.errors.password : ''}
        </div>
        )
    }
}


class Password2Input extends Component{
    constructor(props){
        super(props)
         this.state = {
            password2: '',
            errors: {}
         }

         this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.state.errors) {
            this.setState({ errors: nextProps.state.errors });
          }
    }

    onChange(e){
        e.preventDefault()
        this.setState({
            password2: e.target.value
        }, () => {this.props.userPassword2(this.state.password2)})
    }

    render(){
        return (
            <div className="form-group">
                <input type="password" placeholder="Confirm Password" onChange={this.onChange} className="form-control form-control-lg"  name="password2" required/>
                {this.state.errors.user ? this.state.errors.user.errors.password2 : ''}
            </div>
        )
    }
}

export const NameI =  connect(null,   { userName })(NameInput)
export const EmailI =  connect(null,   { userEmail  })(EmailInput)
export const PasswwordI =  connect(null,   { userPassword})(PasswordInput)
export const Password2I =  connect(null,   {  userPassword2 })(Password2Input)
