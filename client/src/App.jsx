import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Items from "./pages/Items";
import "./assets/css/App.css";

function App() {
    const routes = [
        { path: "/", element: <Home /> },
        { path: "/items", element: <Items /> },
        { path: "/items/:id", element: <Item /> },
    ];

    return (
        <BrowserRouter>
            <div id="App">
                <header id="App-header">
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <title>GW2 Recipe profits</title>
                    GW2 Recipe profits
                </header>
                <NavBar />
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
