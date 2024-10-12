import React from 'react'
import FormLayout from '../components/form-layout'

const Signup = () => {
  const inputs = [
    {
      label: 'Email',
      placeholder: 'Enter your email address',
      name: 'email_address',
      value: '',
      type: 'email'
    },
    {
      label: 'Password',
      placeholder: 'Enter your Password',
      name: 'password',
      value: '',
      type: 'password'
    }
  ]
  return <FormLayout data={{ title: 'Registration', inputs }} />
}

export default Signup
