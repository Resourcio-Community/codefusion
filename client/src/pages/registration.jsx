import { useContext, useState } from "react"
import logo from '../assets/font.webp'
import { Context } from "../context/Context"
import { useHistory } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Registration = () => {
  const { user, setUser } = useContext(Context)
  const history = useHistory()
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    contact: "",
    college:"",
  })

  const getUserData = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
    setErrorMessages({ ...errorMessages, [name]: "" })
  }
  
  const gotoPayment = () => {
    let hasError = false;
    if (!user.name) {
      setErrorMessages((prev) => ({ ...prev, name: "Please enter your name" }));
      hasError = true;
    }

    if (!user.email) {
      setErrorMessages((prev) => ({ ...prev, email: "Please enter your email" }));
      hasError = true;
    } else if (!user.email.includes('@')) {
      setErrorMessages((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      hasError = true;
    }

    if (!user.contact) {
      setErrorMessages((prev) => ({ ...prev, contact: "Please enter your contact number" }));
      hasError = true;
    } else if (!/^\d{10}$/.test(user.contact)) {
      setErrorMessages((prev) => ({ ...prev, contact: "Please enter a valid 10-digit mobile number" }));
      hasError = true;
    }

    if (!user.college) {
      setErrorMessages((prev) => ({ ...prev, college: "Please enter your college" }));
      hasError = true;
    }


    if (!hasError) {
      history.push('/payment');
    } else {
      toast.error("Please correct the errors and try again.");
    }
  };

  return (
    <div className='Background'>
      <div className='form-container'>
        <img src={logo} alt='Logo' loading='lazy' />
        <div className="form">
          <div className='input'>
            <label htmlFor='fname'>Name:</label>
            <input
              id='fname'
              type='text'
              value={user.name}
              onChange={getUserData}
              name='name'
              required
              spellCheck='false'
              placeholder={errorMessages.name || "Name"}
            />
          </div>
          <div className='input'>
            <label htmlFor='femail'>Email:</label>
            <input
              id='femail'
              type='text'
              value={user.email.trim()}
              onChange={getUserData}
              name='email'
              required
              spellCheck='false'
              placeholder={errorMessages.email || "Email"}
            />
          </div>
          <div className='input'>
            <label htmlFor='fcontact'>Contact:</label>
            <input
              id='fcontact'
              type='text'
              value={user.contact.trim()}
              onChange={getUserData}
              name='contact'
              required
              spellCheck='false'
              placeholder={errorMessages.contact || "Contact"}
            />
          </div>
          <div className='input'>
            <label htmlFor='fcontact'>College:</label>
            <input
              id='fcontact'
              type='text'
              name='college'
              value={user.college}
              onChange={getUserData}
              spellCheck='false'
              placeholder={errorMessages.college || "College Name"}
            />
          </div>
          <button type='button' className='btn' onClick={gotoPayment}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
