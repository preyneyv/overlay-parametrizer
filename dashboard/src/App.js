import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css';
import { apiUrl } from './helpers';
import { Overlay } from './Overlay';

const App = () => {
  const [overlays, setOverlays] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await axios.get(apiUrl('/overlays'))
      setOverlays(response.data)
    }
    getData();
  }, [])


  return <div>
    {/* <h1>Overlays</h1> */}
    {Object.values(overlays).map(overlay => {
      async function setOverlay(newState) {
        setOverlays({
          ...overlays,
          [overlay.id]: {...overlay, state: newState}
        })

        await axios.put(apiUrl(`/overlays/${overlay.id}`), newState)
      }
      return <Overlay
        key={overlay.id}
        overlay={overlay}
        setOverlay={setOverlay}
      />
    })}
  </div>
}

export default App;
