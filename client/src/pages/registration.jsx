import { useContext, useState, useRef } from "react"
import logo from "../assets/font.webp"
import { Context } from "../context/Context"
import { useHistory } from "react-router-dom"
import sound from '../assets/Avengers.mp3'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Registration = () => {
  const { user, setUser, setAuth } = useContext(Context)
  const history = useHistory()

  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    const audio = audioRef.current

    if (isPlaying) {
      audio.pause()
    } else {
      audio.volume = 0.2
      audio.play()
    }

    setIsPlaying(prev => !prev)
  }

  const getUserData = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const gotoPayment = () => {
    let hasError = true
    if (user.name !== "" && user.email !== "" && user.email.includes('@') && user.contact !== "" && /^\d{10}$/.test(user.contact)) {
      hasError = false
    }

    if (!hasError) {
      setAuth(true)
      history.push("/payment")
    } else {
      toast.warn("Fill up required fields")
    }
  }

  return (
    <>
      <div className='audio' onClick={togglePlay}>
        <div>
          {
            isPlaying
              ? <ion-icon name="pause-circle-outline"></ion-icon>
              : <ion-icon name="play-outline"></ion-icon>
          }
        </div>
        <audio ref={audioRef} src={sound} />
      </div>
      <div className="Background">
      <div className="form-container">
        <img src={logo} alt="Logo" loading="lazy" />
        <div className="form">
          <div className="input">
            <label htmlFor="fname">Name*</label>
            <input
              id="fname"
              type="text"
              value={user.name}
              onChange={getUserData}
              name="name"
              required
              spellCheck="false"
              placeholder="John Doe"
            />
          </div>
          <div className="input">
            <label htmlFor="femail">Email*</label>
            <input
              id="femail"
              type="text"
              value={user.email.trim()}
              onChange={getUserData}
              name="email"
              required
              spellCheck="false"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="input">
            <label htmlFor="fcontact">Contact*</label>
            <input
              id="fcontact"
              type="text"
              value={user.contact.trim()}
              onChange={getUserData}
              name="contact"
              required
              spellCheck="false"
              placeholder="Phone no."
            />
          </div>
          <div className="input">
            <label htmlFor="fcontact">College</label>
            <input
              id="fcontact"
              type="text"
              name="college"
              value={user.college}
              onChange={getUserData}
              spellCheck="false"
              placeholder="College Name"
            />
          </div>
          <button type="button" className="btn" onClick={gotoPayment}>
            Submit
          </button>
        </div>
      </div>


      <div class="footer">
        <div id="button"></div>
        <div id="container">
          <div id="cont">
            <div class="footer_center">
              <ul class="social-icon">
                <li class="social-icon__item"><a class="social-icon__link" href="https://bit.ly/resourciocommunity">
                  <ion-icon name="logo-whatsapp"></ion-icon>
                </a></li>

                <li class="social-icon__item"><a class="social-icon__link" href="https://discord.gg/gj7d3Q6GRW">
                  <ion-icon name="logo-discord"></ion-icon>
                </a></li>
              </ul>
              <p>&copy;2023 Resourcio | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>




      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>


      <ToastContainer position="top-right" theme="dark" />
    </div>
    </>
  )
}

export default Registration
