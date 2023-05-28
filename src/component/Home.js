import React, { Fragment, useEffect, useState } from "react";
import HeaderData from "./Layout/HeaderData";
import Product from "./Product/Product";
import { API } from "../global";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/product`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <Fragment>
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
    </Fragment>
  );
}
