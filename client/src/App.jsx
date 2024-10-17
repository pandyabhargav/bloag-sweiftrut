import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavScrollExample from './component/Header';
import BodyShorthandExample from './component/card';
import BlogForm from './component/Form';
import EditForm from './component/Edit';
import React, { useState } from 'react';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Router>
            <>
                <NavScrollExample onSearch={setSearchTerm} />
                <Routes>
                    <Route path="/" element={<BodyShorthandExample searchTerm={searchTerm} />} />
                    <Route path="/addForm" element={<BlogForm />} />
                    <Route path='/edit/:id' element={<EditForm />} />
                </Routes>
            </>
        </Router>
    );
}

export default App;
