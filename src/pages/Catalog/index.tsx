import { useNavigate, useParams } from "react-router";
import styles from "./index.module.scss";
import ProductCard from "../../components/components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getCategory,
  getGadgetsCategory,
  getProducts,
} from "../../features/product/productSlice";
import { useEffect } from "react";
import { navData } from "../../data/navItems";
import Spinner from "../../components/components/Spinner";
import GoToTop from "../../components/components/GoToTop";
import Button from "../../components/components/Button";
import { MdArrowBack } from "react-icons/md";
import { ROUTES } from "../../constants/Route";

const Catalog = () => {
  let { id } = useParams();
  const { products, isLoading } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function getActualPrice(price: number) {
    let num = price;
    let numStr = num.toString(); // Convert the number to a string
    let parts = numStr.split("."); // Split the string at the decimal point

    if (parts.length === 2) {
      // Add a 0 to the integer part
      parts[0] = parts[0] + "0";
      let newNumStr = parts.join("."); // Join the parts back together
      let newNum = parseFloat(newNumStr);
      return newNum; // Convert the string back to a number
      //console.log(newNum); // Output the result
    } else {
      return price;
      //console.log("Invalid input");
    }
  }

  useEffect(() => {
    if (!id) {
      const newUrl = window.location.pathname + "/All";
      window.history.pushState({ path: newUrl }, "", newUrl);

      id = "All";
    }

    const category = [
      ...navData.filter((item) => {
        return item.name === id?.toString();
      }),
    ];
    if (category[0].value == "Gadgets") {
      dispatch(getGadgetsCategory());
    } else if (category[0].value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === category[0].value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  }, [id]);

  const convertedString = id
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");

  if (isLoading) return <Spinner />;
  return (
    <div className={`${styles.container} main-container`}>
      <div className={styles.titleContainer}>
        <Button className={styles.iconContainer} onClick={() => navigate(-1)}>
          <MdArrowBack className={styles.icon} />
        </Button>
        <div className={styles.title}>{convertedString}</div>
      </div>
      <div className={styles.productList}>
        {products &&
          products?.map((product, index) => {
            const actualPrice = getActualPrice(
              product.price ? product.price : -1
            );
            if (product.category != "electronics")
              return (
                <ProductCard
                  id={product.id}
                  key={index}
                  title={product.title}
                  price={actualPrice}
                  category={product.category}
                  description={product.description}
                  image={product.image}
                />
              );
          })}
      </div>
      <GoToTop />
    </div>
  );
};

export default Catalog;
