import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/ourproducts");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline="true">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-dark" className=" p-10">
        Search
      </Button>
    </Form>
  );
};

export default Search;