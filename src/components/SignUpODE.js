import React from 'react';
import { Component } from 'react';
import SignUpOdeDetails from './SignUpOdeDetails';
import OdeNumbConfirm from './odeNumbConfirm';
import OdeSignUpSuccess from './odeSignUpSuccess';

export class SignUpODE extends Component {
    state = {
        step: 1,
        email: '',
        name: '',
        password: '',
        confirmPass: '',
        phoneNumb: '',
        phoneCode:'',

    }

    // go back to previous step
    prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // go back to next step
    nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  // handle field change
    handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  
    render () {
        const { step } = this.state;
        const { email, name, password, confirmPass, phoneNumb, phoneCode } = this.state;
        const values = { email, name, password, phoneNumb, confirmPass, phoneCode }
        
        switch (step) {
            case 1: 
              return (
                <SignUpOdeDetails
                values={values}
                nextStep={this.nextStep}
                handleChange={this.handleChange} />
              )
            case 2: 
              return (
                <OdeNumbConfirm 
                values={values}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}/>
              )
            case 3:
              return (
                <OdeSignUpSuccess />
              )
            // never forget the default case, otherwise VS code would be mad!
            default: 
               // do nothing
          }
    }
}

export default SignUpODE;