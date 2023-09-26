import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";
import Footer from "./Footer";
import agent from "../api/agent";
import { setProduct } from "../../features/catalog/catalogSlice";
import useProducts from "../hooks/useProduct";
import { Product } from "../models/product";

export default function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [previousHighestRatedProduct, setPreviousHighestRatedProduct] = useState<Product>();
  const comments = useAppSelector(state => state.comment)

  useEffect(() => {
    // Only proceed if products are available
    if (products.length === 0) return;
    const fetchData = async () => {
      try {
        const [productsData] = await Promise.all([
          agent.Catalog.getAll(),
        ]);
        setAllProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [products.length, products]);

  useEffect(() => {
    // Check if allProducts is not empty
    if (allProducts.length > 0) {
      // Find the product with the highest average rating
      const highestRatedProduct = allProducts.reduce((maxProduct, product) => {
        return product.averageRating > maxProduct.averageRating ? product : maxProduct;
      });

      // Check if the highest rated product has changed
      if (
        highestRatedProduct.id !== previousHighestRatedProduct?.id) {
        // Calculate the discount
        const discount = (highestRatedProduct.price / 100) * 25;

        // Update the product discount
        updateProductDiscount(highestRatedProduct.id, discount);

        // Update the previous highest rated product
        setPreviousHighestRatedProduct(highestRatedProduct);
      }
    }
  }, [dispatch, products, allProducts, comments, updateProductDiscount]);

  async function updateProductDiscount(productID: number, discount: number) {
    try {
      const newDiscount = {
        id: productID,
        discount: discount,
      };

      const response = await agent.Orders.updateDiscount(newDiscount);
      dispatch(setProduct(response));
    } catch (error) {
      console.error(error);
    }
  }

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }
    catch (er) {
      console.log(er)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkmode, setDarkMode] = useState(false);
  const paletteType = darkmode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      primary: {
        main: paletteType === 'light' ? '#4f4e4a' : '#cccbc8',
      },
      background: {
        default: paletteType === 'light' ? '#e6e6e6' : '#333333',
      },
    },
  });

  function ThemeSwitchHandler() {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header darkMode={darkmode} ThemeChangeHandler={ThemeSwitchHandler} />
        <div style={{ flex: 1 }}>
          {loading ? <LoadingComponent message="Initializing app..." />
            : location.pathname === '/' ? <HomePage />
              : <Container sx={{ mt: 4 }}>
                <Outlet />
              </Container>
          }
        </div>
        <Footer darkmode={darkmode} />
      </div>
    </ThemeProvider>
  );
}
