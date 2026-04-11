import {useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'

// Page transition wrapper
const PageWrapper = ({ children }) => {
  const location = useLocation()
  const [display, setDisplay] = useState(children)
  const [animKey, setAnimKey] = useState(location.pathname)

  useEffect(() => {
    setAnimKey(location.pathname)
    setDisplay(children)
  }, [location.pathname, children])

  return (
    <div
      key={animKey}
      style={{
        animation: 'pageIn .35s cubic-bezier(.22,1,.36,1) forwards',
        opacity: 0,
      }}
    >
      {display}
    </div>
  )
}

export default PageWrapper ;