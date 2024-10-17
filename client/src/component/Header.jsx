import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavScrollExample({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value; 
        setSearchTerm(term); 
        onSearch(term); 
    };

    return (
        <Container fluid>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="#">Bloag</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto my-2 mx-5 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="/addForm"><b>+ Add Bloag</b></Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearch} 
                        />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default NavScrollExample;
