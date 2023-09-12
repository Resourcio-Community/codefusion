import { useState, useRef } from 'react'
import axios from 'axios'
import './app.css'
import logo from './assets/font.webp'
import sound from './assets/Avengers.mp3'

export default function App() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    college: ''
  })

  const togglePlay = () => {
    const audio = audioRef.current

    if (isPlaying) {
      audio.pause()
    } else {
      audio.volume = 0.2
      audio.play()
    }

    setIsPlaying(!isPlaying)
  }

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

      // const response = await fetch(`${databaseURL}/${path}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name: name.trim(),
      //     email: email,
      //     contact: contact,
      //     college: college.trim()
      //   })
      // })

      // if (response.ok) {
      //   console.log('Data successfully posted.')
      // }

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/pay`)
      console.log(data)
    }
    catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='Background'>
      <div className='form-container'>
        <form>
          <div className='audio' onClick={togglePlay}>
            <img src={logo} alt='Logo' loading='lazy' />
            <div>
              {
                isPlaying
                  ? <ion-icon name="pause-circle-outline"></ion-icon>
                  : <ion-icon name="play-outline"></ion-icon>
              }
            </div>
          </div>
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
            Make Payment
          </button>
        </form>
        <audio ref={audioRef} src={sound} />
      </div>
    </div>
  )
}