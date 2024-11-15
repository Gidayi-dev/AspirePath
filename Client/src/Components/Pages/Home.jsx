// The landing page of your job board platform.
// Contains a welcome section, a brief overview, and links to key sections like Find Jobs and Post Job.
import Filter from "../FilterSidebar";
import JobList from "../JobList";
import NavBar from "../Navbar";
import SearchBar from "../SearchBar";

function Home() {
    return(
        <div>
        <NavBar />
        <SearchBar/>
        <Filter/>
        <JobList/>
        
        </div>
    )
}
export default Home