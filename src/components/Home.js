import React, { useState, useRef } from "react";
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogleDrive } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css";
// import { IoIosAdd } from "react-icons/io";
import { MdDevices } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ListGroup from 'react-bootstrap/ListGroup';
import { Uploader } from './Uploader.js';

export function Home() {
    const API_ENDPOINT = " https://ggst5fx39j.execute-api.us-east-1.amazonaws.com/default/getPresignedImageURL";
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const inputRef = useRef(null);

    // const handleUpload = () => {
    // inputRef.current?.click();
    // handleSubmit()
    // };

    const handleSubmit = async(files) => {
        inputRef.current?.click();
        const f = files[0];
        console.log("Inside handle submit",f['file']);
        //GET req for presigned URL
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT
          })

        console.log("Response :", response);
        //PUT req: upload file to S3
        const result = await fetch(response.data.uploadURL, {
            method: 'PUT',
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: f["file"]
          })
        console.log('Result: ', result.url);
        alert("Please Check the console for your S3 bucket URL");
    }

    const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
        setUploadedFileName(inputRef.current.files[0].name);
    };

    return (
        <main>
            <div>
                <Navbar className="navs" bg="white" expand="lg">
                    <Container>
                        <Navbar.Brand style={{ width: '5rem' }} href="#">
                            <FaGoogleDrive /> Drive
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className="nav-coll">
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-1 search-bar"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success"><BsSearch /></Button>
                            </Form>
                            <Nav
                                className="mr-auto my-2 my-lg-0 justify-content-end nav-two"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="#action1" className="icons"><BsQuestionCircle /></Nav.Link>
                                <Nav.Link href="#action2" className="icons"><IoIosSettings /></Nav.Link>
                                <Nav.Link href="#" className="icons">
                                    <FaUserCircle />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Row>
                    <Col lg={3}>
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <br />
                            <div className="m-3">
                                {/* <label className="mx-3">Choose file:</label> */}
                                <input
                                    ref={inputRef}
                                    onChange={handleDisplayFileDetails}
                                    className="d-none"
                                    type="file"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className={`btn btn-outline-${uploadedFileName ? "success" : "primary"
                                        }`}
                                >
                                    {uploadedFileName ? uploadedFileName : "+ New"}
                                </button>
                            </div>


                            <ListGroup>
                                <ListGroup.Item action className="list"><Nav.Link ><span className="bgblack"><FaGoogleDrive />  My Drive</span></Nav.Link></ListGroup.Item>
                                <ListGroup.Item action className="list"><Nav.Link ><span className="bgblack"><MdDevices />  Computers</span></Nav.Link></ListGroup.Item>
                                <ListGroup.Item action className="list"><Nav.Link ><span className="bgblack"><FiUsers />  Shared with me</span></Nav.Link></ListGroup.Item>
                                <ListGroup.Item action className="list"><Nav.Link ><span className="bgblack">
                                    <BsClock />  Recent</span>
                                </Nav.Link></ListGroup.Item>
                                <ListGroup.Item action className="list"><Nav.Link ><span className="bgblack"><AiOutlineStar />  Starred</span></Nav.Link></ListGroup.Item>
                                <ListGroup.Item action className="list"><Nav.Link ><span className="bgblack"><BsTrash />  Trash</span></Nav.Link></ListGroup.Item>
                            </ListGroup>
                        </Nav>
                        <hr />
                    </Col>
                    <Col lg={9}>
                        <br />
                        <Row>
                            {/* <Dropzone /> */}
                            <Uploader />
                        </Row>

                    </Col>
                </Row>
            </div>
        </main>
    )
}