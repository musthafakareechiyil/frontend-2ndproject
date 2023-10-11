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
        <GoogleOAuthProvider clientId='439877519923-qpmbcqt3gb88svahhi65hnal1nkelfc6.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
  </Provider>
);
