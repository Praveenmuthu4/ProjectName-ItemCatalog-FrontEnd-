import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../global";
import HeaderData from "../Layout/HeaderData";
import { Carousel } from "react-bootstrap";
import { useCartDispatch } from "../context/context";

export default function ViewProduct({ match }) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= products.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  useEffect(() => {
    axios.get(`${API}/api/product/${id}`).then((res) => {
      setProducts(res.data.product);
    });
  }, []);
  const navigate = useNavigate();
  const cartDispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: { product } });
    navigate("/cart");
  };

  return (
    <Fragment>
      <HeaderData title={products.name} />
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <Carousel pause="hover">
            {products.image &&
              products.image.map((img) => (
                <Carousel.Item key={img.public_id}>
                  <img
                    className="d-block w-100"
                    src={img.url}
                    alt={products.title}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
        <div className="col-12 col-lg-5 mt-5">
          <h3>{products.name}</h3>
          <p id="product_id">Product # {products._id}</p>

          <hr />

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(products.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({products.numOfReviews} Reviews)</span>

          <hr />

          <p id="product_price">${products.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn minus" onClick={decreaseQty}>
              -
            </span>

            <input
              type="number"
              className="form-control count d-inline"
              value={quantity}
              readOnly
            />

            <span className="btn plus" onClick={increaseQty}>
              +
            </span>
          </div>
          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
            disabled={products.stock === 0}
            onClick={() => handleAddToCart(products)}
          >
            Add to cart
          </button>

          <hr />

          <p>
            Status:{" "}
            <span
              id="stock_status"
              className={products.stock > 0 ? "greenColor" : "redColor"}
            >
              {products.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{products.description}</p>
          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{products.seller}</strong>
          </p>

          <button
            id="review_btn"
            type="button"
            className="btn btn-primary mt-4"
            data-toggle="modal"
            data-target="#ratingModal"
          >
            Submit Your Review
          </button>

          <div className="alert alert-danger mt-5" type="alert">
            Login to post your review.
          </div>

          <div className="row mt-2 mb-5">
            <div className="rating w-50">
              <div
                className="modal fade"
                id="ratingModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="ratingModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ratingModalLabel">
                        Submit Review
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ul className="stars">
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                        <li className="star">
                          <i className="fa fa-star"></i>
                        </li>
                      </ul>

                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>

                      <button
                        className="btn my-3 float-right review-btn px-4 text-white"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
