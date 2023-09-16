import './home.scss'
import { Herobanner, Trending, Popular,Toprated } from './homeIndex'


const Home = () => {
  return (
    <div className='home'>
      <Herobanner/>
      <Trending/>
      <Popular/>
      <Toprated/>
    </div>
  )
}

export default Home
