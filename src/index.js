import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = { store } >
      <BrowserRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
          {console.log(process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID, "consoling the env data google auth")}
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
  </Provider>
);
