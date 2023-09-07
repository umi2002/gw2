import "./App.css";

import ItemSearch from './views/item_search';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                Query Guild Wars 2 API
            </header>
            <body>
                <ItemSearch />
            </body>
        </div>
    );
}

export default App;
