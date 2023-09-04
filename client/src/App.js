import './App.css';

import { useGW2InfoFetch, } from './fetch_GW2.js';
import InputBox from './components/input_box';

function App() {
    const { serverInfo, error, isLoading } = useGW2InfoFetch();

    return (
        <div className="App">
            <header className="App-header">
                Query Guild Wars 2 API
            </header>
            <InputBox />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {serverInfo && <p>{JSON.stringify(serverInfo)}</p>} {/* As an example */}
        </div>
    );
}

export default App;
