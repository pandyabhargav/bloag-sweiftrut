import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'; 

function MyVerticallyCenteredModal({ show, onHide, blog }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {blog.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Blog Content</h4>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                <div>Posted on {new Date(blog.createdAt).toLocaleDateString()}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function BodyShorthandExample({ searchTerm }) {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/');
                const data = await response.json();
                setBlogs(data);
                setFilteredBlogs(data); 
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
       
        if (searchTerm) {
            setFilteredBlogs(blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchTerm, blogs]);

    const handleViewBlog = (blog) => {
        setSelectedBlog(blog);
        setModalShow(true);
    };

    const handleDeleteBlog = async (id) => {
        
            try {
                const response = await fetch(`http://localhost:3000/delete/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setBlogs(blogs.filter(blog => blog._id !== id));
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
       
    };

    return (
        <Container>
            <div className='col-12 d-flex p-5'>
                <div className='col-12'>
                    {filteredBlogs.map(blog => (
                        <Card key={blog._id} className="mb-4">
                            <Card.Header><h2>{blog.title}</h2></Card.Header>
                            <Card.Body>
                                <Card.Text className='pb-4'>
                                    <h5>
                                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                    </h5>
                                </Card.Text>
                                <Button variant="success" onClick={() => handleViewBlog(blog)}>View Blog</Button>{' '}
                                <Button variant="primary" onClick={() => navigate(`/edit/${blog._id}`)}>Edit Blog</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteBlog(blog._id)}>Delete Blog</Button>{' '}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                blog={selectedBlog} 
            />
        </Container>
    );
}

export default BodyShorthandExample;
