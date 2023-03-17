

import { BrowserRouter } from "react-router-dom";
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DailyProvider from './lib/realtime';

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
        <DailyProvider>
          <App />
        </DailyProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
