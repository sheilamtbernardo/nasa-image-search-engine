import React from 'react';
import './App.css';
import ImageSearch from "./views/ImageSearch";

function App() {
    return (
       <div className="App">
        <header className="App-header">
            <ImageSearch title={'NASA Image Library'}/>
        </header>
    </div>
    );
}

export default App;
