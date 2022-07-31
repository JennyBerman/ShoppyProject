import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import {
  addToFavourites,
  removeFromFavourites,
} from "../actions/favouritesActions";
import { Row, Col, Button, Card } from "react-bootstrap";

const Favourites = () => {
  const { id: productId } = useParams();

  const favourites = useSelector((state) => state.favourites);
  const { favouritesItems } = favourites;

  const removeFromFavouritesHandler = (id) => {
    dispatch(removeFromFavourites(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToFavourites(productId));
    }
  }, [dispatch, productId]);

  return (
    <>
      <h1>Favourites</h1>

      {favouritesItems.length === 0 ? (
        <Message variant="light">
          No favourites yet <Link to="/products"> Go Back</Link>
        </Message>
      ) : (
        <>
          {" "}
          <Row className="my-3 p-3 ">
            {favouritesItems.map((item) => (
              <Col key={item.product} sm={12} md={6} lg={4} xl={3}>
                <Card style={{ width: "18rem", marginBottom: "15px" }}>
                  <Card.Img variant="top" src={item.image} alt={item.name} />

                  <Card.Body>
                    <Card.Title>
                      <Link to={`/product/${item.product}`}>
                        <i class="fa-solid fa-star"></i>
                        {item.name}
                      </Link>
                    </Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => removeFromFavouritesHandler(item.product)}
                    >
                      Remove From Favourites
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}{" "}
          </Row>
        </>
      )}
    </>
  );
};

export default Favourites;
