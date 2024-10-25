import {Routes, Route} from "react-router-dom";
import Home from "../Pages/Home";
import Hotel from "../Pages/Hotel";
import MyPlanner from "../Pages/MyPlanner";
import ContactUs from '../Pages/contactUs';
import SearchResults from '../Pages/searchResults';


function AllRoutes(){
    return <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/hotel" element={<Hotel />} ></Route>
        <Route path="/planner" element={<MyPlanner />} ></Route>
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/searchResults" element={<SearchResults />} />

    </Routes>
}

export default AllRoutes;