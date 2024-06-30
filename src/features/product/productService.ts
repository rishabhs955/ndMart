import axiosConfig from "../../app/axiosConfig";
import { gadgets } from "../../data/gadgets";

const getProducts = async () => {
  const response = await axiosConfig.get("products");

  return response.data;
};
const getSingleProduct = async (id: number) => {
  const response = await axiosConfig.get("products/" + id);

  return response.data;
};
const getCategory = async (data: string) => {
  const response = await axiosConfig.get("/products/category/" + data);

  return response.data;
};

const getGadgetsCategory = async () => {
  const gadgetsData = JSON.parse(gadgets);
  console.log(gadgetsData);
  return gadgetsData;
};

const getSingleGadget = async (id: number) => {
  const gadgetsData = JSON.parse(gadgets);
  let getSingleGadget: any;
  gadgetsData.map((gadget: any) => {
    if (gadget.id == id) {
      getSingleGadget = gadget;
      //getSingleGadget.push(gadget);
    }
  });
  return getSingleGadget;
};

const productService = {
  getProducts,
  getSingleProduct,
  getCategory,
  getGadgetsCategory,
  getSingleGadget,
};

export default productService;
