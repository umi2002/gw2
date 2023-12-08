import SearchBar from "./SearchBar";
import "../assets/css/NavBar.css";

function NavBar() {
    return (
        <nav id="nav-bar">
            <a href="/">Home</a>
            <SearchBar />
        </nav>
    );
}

export default NavBar;
