import React, { useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };

  return (
    <FormContainer>
      <h1> Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">
            <h2>Select:</h2>
          </Form.Label>

          <Col>
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              id="PayPal"
              label="Credit Card"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue to payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
