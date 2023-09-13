import { useContext, useState } from "react"
import logo from '../assets/font.webp'
import { Context } from "../context/Context"
import { useHistory } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Registration = () => {
  const { user, setUser, setAuth } = useContext(Context)
  const history = useHistory()

  const getUserData = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const gotoPayment = () => {
    let hasError = false
    if (user.name === '') {
      hasError = true
    }

    if (user.email === '' && !user.email.includes('@')) {
      hasError = true
    }

    if (user.contact === '' && !/^\d{10}$/.test(user.contact)) {
      hasError = true
    }


    if (!hasError) {
      setAuth(true)
      history.push('/payment')
    } else {
      toast.warn("Fill up required fields")
    }
  }

  return (
    <div className='Background'>
      <div className='form-container'>
        <img src={logo} alt='Logo' loading='lazy' />
        <div className="form">
          <div className='input'>
            <label htmlFor='fname'>Name*</label>
            <input
              id='fname'
              type='text'
              value={user.name}
              onChange={getUserData}
              name='name'
              required
              spellCheck='false'
              placeholder="John Doe"
            />
          </div>
          <div className='input'>
            <label htmlFor='femail'>Email*</label>
            <input
              id='femail'
              type='text'
              value={user.email.trim()}
              onChange={getUserData}
              name='email'
              required
              spellCheck='false'
              placeholder="example@gmail.com"
            />
          </div>
          <div className='input'>
            <label htmlFor='fcontact'>Contact*</label>
            <input
              id='fcontact'
              type='text'
              value={user.contact.trim()}
              onChange={getUserData}
              name='contact'
              required
              spellCheck='false'
              placeholder="Phone no."
            />
          </div>
          <div className='input'>
            <label htmlFor='fcontact'>College</label>
            <input
              id='fcontact'
              type='text'
              name='college'
              value={user.college}
              onChange={getUserData}
              spellCheck='false'
              placeholder="College Name"
            />
          </div>
          <button type='button' className='btn' onClick={gotoPayment}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
      />
    </div>
  )
}

export default Registration
