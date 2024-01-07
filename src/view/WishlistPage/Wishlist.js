import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { addToCart } from "../../redux/ActionsFolder/CartAction";
import { removeFromWishList } from "../../redux/ActionsFolder/WishListAction";
import ProductOptions from "../Common/ProductOptions";

const Wishlist = (props) => {
  const items = useSelector((state) => state.WishList.wishlistItems);
  let Product = [];
  const history = useHistory();
  const dispatch = useDispatch();

  items.map((e) => {
    Product.push(e);
  });

  const addToCartHandler = () => {
    history.push(`/`);
  };

  const classes = useStyles();
  return (
    <div style={{ marginTop: "8px" }}>
      <ProductOptions />
      <ul className={classes.ulStyling}>
        <li>
          {Product.length > 0 ? (
            Product.map((val) => (
              <Card className={classes.root}>
                <Link
                  to={`/selected-product/${val.id}`}
                  key={val.id}
                  className={classes.linkcolor}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Photographs"
                      height="240"
                      image={val.productImage}
                    />
                    <CardContent className={classes.nameOfProducts}>
                      <Typography>
                        <p className={classes.productlistNAmes}>
                          <b>{val.brand}</b>
                          <br />
                          <small>{val.productName}</small>
                          <br></br>
                          <b>Rs. {val.amount}</b>
                        </p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions className={classes.iconimg}>
                  <Button
                    onClick={() => dispatch(addToCart(val, props.setCount))}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(removeFromWishList(val, props.setWishlistCount));
                    }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <div>
              <h3 style={{ textAlign: "center" }}>Your Wishlist is empty :(</h3>
              <Button
                style={{ marginLeft: "640px" }}
                className={classes.cartBtn}
                onClick={addToCartHandler}
              >
                Add Items
              </Button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};
export default Wishlist;

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
  cartBtn: {
    backgroundColor: "burlywood",
    fontSize: "13px",
    paddingLeft: "16px",
    paddingRight: "16px",
    marginRight: "7px",
    marginTop: "15px",
    "&:hover": {
      backgroundColor: "burlywood",
      boxShadow: "none",
    },
  },
});
