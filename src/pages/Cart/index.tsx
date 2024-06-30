import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./index.module.scss";
import Button from "../../components/components/Button";
import {
  cartReset,
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../features/cart/cartSlice";
import { MdArrowBack, MdCheck, MdDelete } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import Spinner from "../../components/components/Spinner";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const Cart = () => {
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (a, c) => a + c.quantity * c.product.price,
    0
  );

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    //border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.titleContainer}>
          <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
            <MdArrowBack className={styles.icon} />
          </Button>
          <div className={styles.title}>Shopping Bag</div>
        </div>
        {cartItems.length ? (
          <div className={styles.content}>
            <div className={styles.cartLeft}>
              <div
                className={styles.emptyCart}
                onClick={() => dispatch(cartReset())}
              >
                Empty Cart
              </div>
              {cartItems.map((item) => {
                return (
                  <div className={styles.cartCardWrapper}>
                    <Link
                      to={`/products/${item.product.id}`}
                      className={styles.cartCardContainer}
                    >
                      <img
                        src={item.product.image}
                        className={styles.cartCardImage}
                        alt={item.product.title}
                      />
                      <div className={styles.cartCardDetails}>
                        <div className={styles.cartCardLeft}>
                          <div className={styles.title}>
                            {item.product.title}
                          </div>
                          {/* <div className={styles.size}>Size: 36</div> */}
                          <div className={styles.price}>
                            ₹ {item.product.price}
                          </div>
                          <div className={styles.return}>
                            <div className={styles.iconContainer}>
                              <TbTruckReturn className={styles.icon} />
                            </div>
                            <div className={styles.title}>
                              30 days return available
                            </div>
                          </div>
                          <div className={styles.delivery}>
                            <div className={styles.iconContainer}>
                              <MdCheck className={styles.icon} />
                            </div>
                            <div className={styles.title}>
                              Delivery by 7 days
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className={styles.cartCardRight}>
                      <div className={styles.cartCardRightWrapper}>
                        <Button
                          className={styles.button}
                          onClick={() =>
                            dispatch(reduceItemFromCart(item.product))
                          }
                        >
                          -
                        </Button>
                        <div className={styles.counter}>{item.quantity}</div>
                        <Button
                          className={styles.button}
                          onClick={() =>
                            dispatch(incrementItemFromCart(item.product))
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        className={styles.cartCardDelete}
                        onClick={() =>
                          dispatch(removeItemFromCart(item.product.id))
                        }
                      >
                        <MdDelete className={styles.icon} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.cartRight}>
              <div className={styles.coupon}>
                <div className={styles.title}>Coupons</div>
                <div className={styles.couponContent}>
                  <div className={styles.iconContainer}>
                    <BiPurchaseTag className={styles.icon} />
                  </div>
                  <div className={styles.title}>Apply Coupons</div>
                  <Button className={styles.button}>Apply</Button>
                </div>
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.title}>Price Details</div>
                <div className={styles.priceContent}>
                  <div className={styles.title}>Total MRP</div>
                  <div className={styles.price}>{totalPrice.toFixed(2)}</div>
                </div>
                <div className={styles.priceContent}>
                  <div className={styles.title}>Platform Fee</div>
                  <div className={styles.price}>FREE</div>
                </div>
                <div className={styles.priceContent}>
                  <div className={styles.title}>Shipping Fee</div>
                  <div className={styles.price}>FREE</div>
                </div>
              </div>
              <div className={styles.totalContent}>
                <div className={styles.title}>Total Amount</div>
                <div className={styles.price}>{totalPrice.toFixed(2)}</div>
              </div>
              <Button onClick={handleOpen} className={styles.button}>
                Place Order
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 500 }}>
                  <h2 style={{ marginBottom: "20px" }} id="parent-modal-title">
                    Alert!
                  </h2>
                  <p
                    style={{ marginBottom: "20px" }}
                    id="parent-modal-description"
                  >
                    Your order is not placed yet, please try again!
                  </p>
                  {/* <ChildModal /> */}
                </Box>
              </Modal>
            </div>
          </div>
        ) : (
          <div className={styles.noCartItems}>No Items Here</div>
        )}
      </div>
    </section>
  );
};

export default Cart;
