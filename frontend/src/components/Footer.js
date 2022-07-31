import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            {" "}
            &copy; Shoppy by Jenny Berman 2022 - shoppy@gmail.com
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
