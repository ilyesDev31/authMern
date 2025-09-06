import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useGetMeQuery } from "../slices/userApiSlice";
import { setCredentials } from "../slices/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { user } = useSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  // if (user) return <Navigate to="/profile" />;
  if (user) return <Navigate to="/profile" />;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.user));
      toast.success("logged in successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  if (user) return <Navigate to="/profile" />;
  return (
    <FormContainer>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Login</Button>
        <Row className="py-3">
          <Col>
            dont have an account! <Link to="/register">Register</Link>
          </Col>
        </Row>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
