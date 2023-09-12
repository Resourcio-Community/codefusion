import { useState } from "react"
import logo from '../assets/font.webp'

const Registration = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        college: ''
    })

    const getUserData = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault()

        const { name, email, contact, college } = user

        try {
            const databaseURL = process.env.REACT_APP_DATABASE_URL
            const path = 'users.json'

            const response = await fetch(`${databaseURL}/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email,
                    contact: contact,
                    college: college.trim()
                })
            })

            if (response.ok) {
                console.log('Data successfully posted.')
            }
        }
        catch (err) {
            console.error(err)
        }
    }


    return (
        <div className='Background'>
            <div className='form-container'>
                <img src={logo} alt='Logo' loading='lazy' />
                <form>
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
                    <button type='submit' className='btn' onClick={postData}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registration