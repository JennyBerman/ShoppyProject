import React from "react";
// import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  // const onClickProductHandler = () => {
  //   navigate(`/ourproducts`);
  // };
  // const id = useParams();
  // const keyword = id.keyword;

  // const dispatch = useDispatch();

  return (
    <>
      <Container>
        <h1>Welcome to Healthy Life</h1>

        <div>
          <Row>
            <Col>
              <h2>It's time to become a better you</h2>
              <Button variant="outline-dark" onClick={() => navigate("/about")}>
                Read more about us
              </Button>
              <br></br>
            </Col>
          </Row>
          <Row>
            {" "}
            <h2>Some trending Products:</h2>
          </Row>
        </div>
      </Container>

      <Row>
        <Row className="my-3 p-3 ">
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/images/collagen.jpg" />
              <Card.Body>
                <Card.Title>Collagen</Card.Title>

                <Button
                  variant="primary"
                  onClick={() => navigate(`/ourproducts`)}
                >
                  Go to products
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/images/dumbell.jpg" />
              <Card.Body>
                <Card.Title>Dumbells</Card.Title>

                <Button
                  variant="primary"
                  onClick={() => navigate(`/ourproducts`)}
                >
                  Go to products
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/images/trx.jpg" />
              <Card.Body>
                <Card.Title>TRX</Card.Title>

                <Button
                  variant="primary"
                  onClick={() => navigate(`/ourproducts`)}
                >
                  Go to Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <ProductCarousel /> */}
      </Row>
    </>
  );
};

export default Home;
