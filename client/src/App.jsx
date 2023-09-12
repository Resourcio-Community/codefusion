import { Route, Switch, Redirect } from 'react-router-dom'
import './app.css'
import Home from './pages/home'
import Registration from './pages/registration'
import { useRef, useState } from 'react'
import sound from './assets/Avengers.mp3'


export default function App() {
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
  
      setIsPlaying(!isPlaying)
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
      </div>
      <audio ref={audioRef} src={sound} />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/register'>
          <Registration />
        </Route>
      </Switch>
    </>
  )
}