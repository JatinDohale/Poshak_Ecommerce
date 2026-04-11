import {  useRef } from 'react'

//componemts
import Hero from '../components/home/Hero'
import LatestCollection from '../components/home/LatestCollection'
import BestSeller from '../components/home/BestSeller'
import OurPolicy from '../components/home/OurPolicy'
import NewletterBox from '../components/ui/NewletterBox'

const Home = () => {

  const bestSellerRef = useRef();
  const latestArrivalRef = useRef();
  // const winterEditRef = useRef(); 

  const goToComponents = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div>

      <Hero goToComponents={goToComponents}  bestSellerRef={bestSellerRef} latestArrivalRef={latestArrivalRef} />
      <LatestCollection  latestArrivalRef={latestArrivalRef}  />
      <BestSeller bestSellerRef={bestSellerRef} />
      <OurPolicy />
      <NewletterBox />

    </div>
  )
}

export default Home
