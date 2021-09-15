import { useState } from "react";
import { postResetData } from "../Services/user.service.js";
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    email: "",
}

function Reset() {
    const [userData, setUserData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        postResetData(userData)
            .then((res) => {
                toast.success("Reset link sent to your registered email, Please check your spam also");
                setUserData({
                    email: "",
                })
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })
    }

    return(
        <div className="App">
            <Container >
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <h3>
                            Reset Password
                        </h3>
                        <br />
                        <br />
                        <hr />
                        <br />

                        <Form.Label column sm="2">Email address</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="email" value={userData.email} name="email" placeholder="abc@gmail.com" onChange={handleChange} />
                        </Col>

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicCheckbox">

                    </Form.Group>

                    <br />

                    <Row>
                        <Col sm="2">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export { Reset }