import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentification</h1>
          <p className="text-center mb-4">
            This is a boilerplate for mern authentification that stores a JWT in
            an http-Only cookie. It also uses Redux Toolkit and the react
            bootstrap library
          </p>
          <div className="d-flex">
            <Link variant="primary" to="/login" className="me-3">
              Sign In
            </Link>
            <Link className="me-3" variant="secondary" to="/register">
              Register
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
