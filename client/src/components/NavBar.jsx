import SearchProvider from "../contexts/SearchProvider";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "../assets/css/NavBar.css";

function NavBar() {
    return (
        <nav id="nav-bar">
            <Link to="/"> Home </Link>
            <SearchProvider>
                <SearchBar />
            </SearchProvider>
        </nav>
    );
}

export default NavBar;
