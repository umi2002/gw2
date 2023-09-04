import './App.css';

import { useFetchServerInfo, } from './fetch_server';

function App() {
    const { serverInfo, error, isLoading } = useFetchServerInfo();

    return (
        <div className="App">
            <header className="App-header">
                Query Guild Wars 2 API
            </header>

            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {serverInfo && <p>{JSON.stringify(serverInfo)}</p>} {/* As an example */}
            </div>
        </div>
    );
}

export default App;
