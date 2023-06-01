import React, { Fragment, useEffect, useState } from "react";
import HeaderData from "./Layout/HeaderData";
import Product from "./Product/Product";
import { API } from "../global";
import axios from "axios";
import Loader from "./Layout/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/product`).then((res) => {
      if (!!res) {
        setProducts(res.data.products);
        setLoading(false);
      }
    });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <HeaderData title={"Buy Best Product Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
}
