import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
  deleteProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Loading from "../components/Loading";

const Product = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState([]);

  const { id } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  ///////
  const productReviewDelete = useSelector((state) => state.productReviewDelete);
  const {
    success: successProductReviewDelete,
    loading: loadingProductReviewDelete,
    error: errorProductReviewDelete,
  } = productReviewDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductReview(id));
    }
  };
  ///////

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (userInfo) {
      navigate(`/cart/${id}?qty=${qty}`);
    } else {
      navigate("/signin");
    }
  };

  const addToFavouritesHandler = () => {
    if (userInfo) {
      navigate(`/favourites/${id}?`);
    } else {
      navigate("/signin");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
    setComment(comment);
    setRating(rating);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));

    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }
  }, [
    dispatch,
    id,
    product._id,
    product.reviews,
    rating,
    comment,
    successProductReview,
    // successProductReviewDelete,
  ]);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/ourProducts">
        Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div id="productDetails">
            <Row>
              <Col md={3}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>

              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: {product.price} ILS</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>{product.price} ILS</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        size="lg"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup>
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        size="md"
                        onClick={addToFavouritesHandler}
                      >
                        <i className="fas fa-heart"></i>
                        Add To Favourites
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup id="AllReviews" variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment} </p>
                    {review.user === userInfo._id && (
                      <Button onClick={() => deleteHandler(product._id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                    {/* <p>{review.user}</p>
                    <p>{userInfo._id}</p> */}
                  </ListGroup.Item>
                ))}

                <h2>Write a Customer Review</h2>
                <ListGroup.Item>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loading />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Very Bad</option>
                          <option value="2">2 - Bad</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Great</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        //                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
