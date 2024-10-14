import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RootLayout from './pages/Layout';
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import About from "./pages/about/page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;