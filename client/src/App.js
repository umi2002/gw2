import './App.css';

import { useGW2InfoFetch, } from './fetch_GW2.js';
import ItemSearch from './views/item_search';

function App() {
    const { serverInfo, error, isLoading } = useGW2InfoFetch("/items/4");

    return (
        <div className="App">
            <header className="App-header">
                Query Guild Wars 2 API
            </header>
            <ItemSearch />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {serverInfo && <p>{JSON.stringify(serverInfo)}</p>} {/* As an example */}
        </div>
    );
}

export default App;
