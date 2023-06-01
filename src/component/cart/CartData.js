import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderData from "../Layout/HeaderData";
import axios from "axios";
import { API } from "../../global";
import { useCartDispatch, useCartState } from "../context/context";

export default function CartData() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`${API}/api/product`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const cartDispatch = useCartDispatch();

  const handleRemove = (product) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: { product } });
  };

  const handleProceedCheckout = () => {
    // toggleCartPopup(dispatch);
    navigate("/checkout");
  };

  const increaseQty = () => {
    if (quantity >= products.stock) return;
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const { cartItems } = useCartState();

  return (
    <Fragment>
      <HeaderData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} item</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item._id}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        {item.image &&
                          item.image.map((img) => (
                            <img
                              className="d-block w-100"
                              src={img.url}
                              alt={item._id}
                              key={img.public_id}
                            />
                          ))}
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/api/product/${item._id}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => handleRemove(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + Number(quantity), 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    {cartItems
                      .reduce((acc, item) => acc + quantity * item.price, 0)
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={handleProceedCheckout}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
