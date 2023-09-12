import { useContext } from "react"
import logo from '../assets/font.webp'
import { Context } from "../context/Context"
import { useHistory } from "react-router-dom"

const Registration = () => {
    const { user, setUser } = useContext(Context)
    const history = useHistory()

    const getUserData = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const gotoPayment = () => {
        history.push('/payment')
        // write other logics here
    }


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
                        />
                    </div>
                    <button type='submit' className='btn' onClick={gotoPayment}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Registration