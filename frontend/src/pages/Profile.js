import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loading from "../components/Loading";

const Profile = ({ location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      redirect("/login");
    } else {
      if (!user.name || success) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Wrong Password");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col>
        <FormContainer>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Enter name"
                className="mb-3"
              >
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Enter email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Enter password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "10px" }}
            >
              Update
            </Button>
          </Form>
        </FormContainer>
      </Col>
    </Row>
  );
};

export default Profile;
