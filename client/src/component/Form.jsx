import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useNavigate } from 'react-router-dom'; 

function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      content,
    };

    try {
      const response = await fetch('http://localhost:3000/addForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error('Error in creating blog');
      }

      setSuccess(true);
      setTitle('');
      setContent('');
      
      navigate('/'); 
    } catch (error) {
      setError('Failed to create blog. Please try again.');
    }
  };

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <h2 className="text-center col-12 mb-4">Add New Blog</h2>
      <div className='col-12 d-flex justify-content-center align-items-center'>
        <div className='col-6'>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <Form.Group controlId="blogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="blogContent" className="my-3">
              <Form.Label>Content</Form.Label>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    ['clean'],
                  ],
                }}
                theme="snow"
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Blog created successfully!</p>}

            <Row className="justify-content-center">
              <Col xs="auto">
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default BlogForm;
