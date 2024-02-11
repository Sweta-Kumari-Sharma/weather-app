import React from 'react';
import SearchWeather from './components/SearchWeather';
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import StateSummaryDashboard from './components/StateSummaryDashboard';

const App = () => {
  return (
    <div>
       <BrowserRouter>
    <Routes>
            <Route path='/' element={<SearchWeather />} />
            {/* <Route path='/statewise-summary' element={<StateSummaryDashboard />} /> */}
          
        </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
