import React from 'react';
import Main from './components/MainComponent';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore';

import './App.css';

const store = ConfigureStore();

class App extends React.Component { 
    render() {
        return (
          <div>
            <Provider store={store}>
              <BrowserRouter>
                <Main />
              </BrowserRouter>            
            </Provider>
          </div>
        );
    }
}

export default App;
