import SearchProvider from "../contexts/SearchProvider";
import SearchBar from "./SearchBar";
import "../assets/css/NavBar.css";

function NavBar() {
    return (
        <nav id="nav-bar">
            <a href="/">Home</a>
            <SearchProvider>
                <SearchBar />
            </SearchProvider>
        </nav>
    );
}

export default NavBar;
