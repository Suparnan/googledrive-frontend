import { useState } from "react";
import { postResetFormData } from "../Services/user.service.js";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    passcode: "",
    password: "",
    confirmpassword: "",
}

function Resetform() {
    const [userData, setUserData] = useState(initialState);

    let history = useHistory();

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
        postResetFormData(userData)
            .then((res) => {
                history.push("/login");
                toast.success("Password Reset Successful");
                setUserData({
                    password: "",
                })
            })
            .catch(err => {
                toast.error("some error");
            })
    }

    return(
        <div className="App">
            <Container >
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
                        <h3>
                          Password Reset Form
                        </h3>
                        <br />
                        <br />
                        <hr />
                        <br />

                        <Col sm={4}>
                        <Form.Label column sm="2">Passcode</Form.Label>
                        </Col>
                        <Col sm={5}>
                            <Form.Control type="text" value={userData.passcode} name="passcode" placeholder="Enter Passcode" onChange={handleChange} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                        <Col sm={4}>
                        <Form.Label column sm="2">Password</Form.Label>
                        </Col>
                        <Col sm={5}>
                            <Form.Control type="password" value={userData.password} name="password" placeholder="Enter new Password" onChange={handleChange} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formBasicConfirmPassword">
                        <Col sm={4}>
                        <Form.Label column sm="5">Confirm Password</Form.Label>
                        </Col>
                        <Col sm={5}>
                            <Form.Control type="password" value={userData.confirmpassword} name="confirmpassword" placeholder="Confirm new Password" onChange={handleChange} />
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

export { Resetform }