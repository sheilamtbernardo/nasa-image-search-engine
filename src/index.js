import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import ImageSearchResults from "./views/ImageSearchResults";
import ImageStore from "./stores/ImageStore";
import {Provider} from "mobx-react";

const stores = {
    // Key can be whatever you want
    imageStore: new ImageStore(),
    // ...other stores
};

const routing = (
    <Provider {...stores}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/search-results" component={ImageSearchResults} />
            </div>
        </Router>
    </Provider>

);

ReactDOM.render(routing, document.getElementById('root'));
