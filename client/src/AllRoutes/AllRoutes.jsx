import {Routes, Route} from "react-router-dom";
import Home from "../Pages/Home";
import Hotel from "../Pages/Hotel";
import MyPlanner from "../Pages/MyPlanner";
import ContactUs from '../Pages/contactUs';
import SearchResults from '../Pages/searchResults';
import CreatePost from "../Pages/CreatePost";
import ViewPost from '../Pages/ViewPost';



function AllRoutes(){
    return <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/hotel" element={<Hotel />} ></Route>
        <Route path="/planner" element={<MyPlanner />} ></Route>
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/searchResults" element={<SearchResults />} />

        <Route path="/create-post" element={<CreatePost />} ></Route> 
        <Route path="/view-post/:postId" element={<ViewPost />} />  

    </Routes>
}

export default AllRoutes;