import AllRoutes from './AllRoutes/AllRoutes';
import './App.css';
import Footer from './Components/Footer';
// import Layout from './Components/Layout';
import Navbar from './Components/Navbar';
import { Box } from '@chakra-ui/react';
import ChatBot from './ChatBot/ChatBot'

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Layout> */}
      <Box as="main" pt="66px"> 
        <AllRoutes />
        <ChatBot />
      </Box>
      {/* </Layout> */}
      <Box as="footer" position="inline" bottom="0" width="100%" >
        <Footer />
      </Box>
      </div>
  );
}

export default App;