import React from "react";
import { Helmet } from "react-helmet";

export default function HeaderData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - Shopify`}</title>
    </Helmet>
  );
}
