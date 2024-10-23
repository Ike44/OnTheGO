import {Routes, Route} from "react-router-dom";
import Home from "../Pages/Home";
import Hotel from "../Pages/Hotel";
import MyPlanner from "../Pages/MyPlanner";
import Bookmarks from "../Pages/Bookmarks";

function AllRoutes(){
    return <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/hotel" element={<Hotel />} ></Route>
        <Route path="/planner" element={<MyPlanner />} ></Route>
        <Route path="/bookmarks" element={<Bookmarks />} ></Route>
    </Routes>
}

export default AllRoutes;