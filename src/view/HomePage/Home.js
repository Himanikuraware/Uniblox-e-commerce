import React from "react";

import { Grid } from "@material-ui/core";

import { shoes, mensFashionPhotograpgy } from "../../assets";
import ProductCategory from "../Category/ProductCategory";
import ProductOptions from "../Common/ProductOptions";
import "./style.css";

const Home = ({ newData }) => {
  return (
    <div style={{ marginTop: "8px" }}>
      <ProductOptions newData={newData} />
      <Grid container>
        <Grid item xs={4}>
          <img
            className="imageArea"
            alt=" Fashion Photograpgy"
            src={mensFashionPhotograpgy}
          />
        </Grid>
        <Grid item xs={4} className="boxShadow-Content" />
        <Grid item xs={4}>
          <img className="imageArea" alt="Shoes" src={shoes} />
        </Grid>
      </Grid>
      <ProductCategory newData={newData} />
    </div>
  );
};
export default Home;
