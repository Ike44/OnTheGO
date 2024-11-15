import { Box } from '@chakra-ui/react'
import React from 'react'
import Homeeight from '../Components/Home/Homeeight'
import Homefive from '../Components/Home/Homefive'
import Homefour from '../Components/Home/Homefour'
import Homeone from '../Components/Home/Homeone'
import Homeseven from '../Components/Home/Homeseven'
import Homesix from '../Components/Home/Homesix'
import Homethree from '../Components/Home/Homethree'
import Hometwo from '../Components/Home/Hometwo'
import HomeCountries from '../Components/Home/HomeCountries'
import HomePostFeed from '../Components/Home/HomePostFeed'
import ChatBot from '../ChatBot/ChatBot'

const Home = () => {
  return (
    <Box>
      <Homeone />
      {/* <Hometwo /> */}
      {/* <Homethree /> */}
      {/* <Homefour /> */}
      {/* <Homefive /> */}
      {/* <Homesix /> */}
      <HomeCountries />
      <HomePostFeed />
      {/* <Homeseven /> */}
      <Homeeight />
      <ChatBot />
    </Box>
  )
}

export default Home
