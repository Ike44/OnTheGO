import AllRoutes from './AllRoutes/AllRoutes';
import './App.css';
import Footer from './Components/Footer';
// import Layout from './Components/Layout';
import Navbar from './Components/Navbar';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Layout> */}
      <Box as="main" pt="66px"> 
        <AllRoutes />
      </Box>
      {/* </Layout> */}
      <Footer />
    </div>
  );
}

export default App;