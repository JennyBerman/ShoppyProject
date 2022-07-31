import React from "react";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

const About = () => {
  return (
    <>
      <h1>About us</h1>
      <div className="about" id="about">
        <Row md={10}>
          <h2>
            Decided to become healthier but not sure where to begin? We're here
            to help!
          </h2>
        </Row>
        <Row>
          <h5>
            Shoppy is a platform for every person that wants to live a better,
            healthier and happier life.
            <br></br>
            We provide a wide range of tools gor you to achieve your best
            potential!
            <br></br>
            <br></br>
            From gym clothes and equipment to supplements whit will enhance your
            performance, we've got it all.
          </h5>
        </Row>
        <Row className="my-3 p-3 ">
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/images/supplement.jpg" />
              <Card.Body>
                <Card.Title>Food Supplements</Card.Title>
                <Card.Text>
                  Food supplements are intended to correct nutritional
                  deficiencies, maintain an adequate intake of certain
                  nutrients, or to support specific physiological functions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/images/equipment.jpg" />
              <Card.Body>
                <Card.Title>Workout Equipment</Card.Title>
                <Card.Text>
                  Shop a wide selection of exercise and fitness
                  equipment.Setting up your own home gym means creating a
                  training environment that is both comfortable and private.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/images/cloth.jpg" />
              <Card.Body>
                <Card.Title>Workout Clothes</Card.Title>
                <Card.Text>
                  most modern-day gym clothes can help to make your workout more
                  effective by wicking away sweat, adding support, and providing
                  comfort.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;
