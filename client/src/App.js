import AllRoutes from './AllRoutes/AllRoutes';
import './App.css';
import Footer from './Components/Footer';
import Layout from './Components/Layout';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Layout> */}
        <AllRoutes />
      {/* </Layout> */}
      <Footer />
    </div>
  );
}

export default App;