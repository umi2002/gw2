import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./assets/css/App.css";

function App() {
    const routes = [{ path: "/", element: <Home /> }];

    return (
        <BrowserRouter>
            <div id="App">
                <header id="App-header">
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    Query Guild Wars 2 API
                </header>
                <main id="App-main">
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
