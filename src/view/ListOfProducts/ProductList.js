import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import {
  FavoriteBorderSharp,
  Favorite,
  AddShoppingCartSharp,
  ShoppingCart,
} from "@material-ui/icons";
import { useParams, Link } from "react-router-dom";

import ProductOptions from "../Common/ProductOptions";
import { fetchProductsData } from "../../redux/ActionsFolder/Action";
import { addToCart } from "../../redux/ActionsFolder/CartAction";
import { addToWishlist } from "../../redux/ActionsFolder/WishListAction";

const ProductList = ({
  newData,
  searchTerm,
  setSearchTerm,
  setCount,
  setWishlistCount,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [myClass, setMyClass] = useState("");
  const [myCartClass, setMyCartClass] = useState("");

  useEffect(() => {
    if (window.location.pathname.split("/")[1] !== "") {
      setSearchTerm && setSearchTerm("");
    }
    dispatch(fetchProductsData());
  }, [window.location.pathname]);

  const categoryProduct = useParams();

  let getCategorizedProducts = [];

  newData?.map(function (e, i) {
    if (e.category === categoryProduct.categoryProduct) {
      getCategorizedProducts.push(e);
    }
  });

  const onAdd = (e, number) => {
    if (number.id === e.currentTarget.id) {
      setMyCartClass(number.id);
    }
    number.cartToggle = !number.cartToggle;
    dispatch(addToCart(number, setCount));
  };

  const onWhislist = (e, number) => {
    if (number.id === e.currentTarget.id) {
      setMyClass(number.id);
    }
    number.like = !number.like;
    dispatch(addToWishlist(number, setWishlistCount));
  };
  const data = searchTerm === "" ? getCategorizedProducts : newData;

  return (
    <div style={{ marginTop: "8px" }}>
      <ProductOptions />
      <ul className={classes.ulStyling}>
        <li>
          {data?.map((number) => (
            <Card className={classes.root}>
              <Link
                to={`/selected-product/${number.id}`}
                key={number.id}
                className={classes.linkcolor}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Photographs"
                    height="240"
                    image={number.productImage}
                  />
                  <CardContent className={classes.nameOfProducts}>
                    <Typography>
                      <p className={classes.productlistNAmes}>
                        <b>{number.brand}</b>
                        <br />
                        <small>{number.productName}</small>
                        <br></br>
                        <b>Rs.{number.amount}</b>
                      </p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions className={classes.iconimg}>
                <div
                  className={classes.pointer}
                  id={number.id}
                  onClick={(e) => onWhislist(e, number)}
                >
                  {!number.like ? <FavoriteBorderSharp /> : <Favorite />}
                </div>
                <div
                  id={number.id}
                  onClick={(e) => onAdd(e, number)}
                  className={classes.pointer}
                >
                  {number.cartToggle ? (
                    <ShoppingCart />
                  ) : (
                    <AddShoppingCartSharp />
                  )}
                </div>
              </CardActions>
            </Card>
          ))}
        </li>
      </ul>
    </div>
  );
};
export default ProductList;

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    margin: "25px",
    boxShadow: "1px 1px 5px 2px rgb(0 0 0 / 20%)",
    display: "inline-block",
    width: "100%",
  },
  ulStyling: {
    listStyle: "none",
  },
  nameOfProducts: {
    backgroundColor: "antiquewhite",
    padding: "1px",
  },
  productlistNAmes: {
    fontSize: "12px",
    marginLeft: "10px",
    textAlign: "left !important",
  },
  iconimg: {
    backgroundColor: "burlywood",
  },
  linkcolor: {
    color: "black",
    textDecoration: "none",
  },
  pointer: {
    cursor: "pointer",
  },
});
