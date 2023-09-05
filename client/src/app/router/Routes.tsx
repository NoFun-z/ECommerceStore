import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Orders from "../../features/orders/OrdersPage";
import Register from "../../features/account/Register";
import Catalog from "../../features/catalog/CatalogPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Inventory from "../../features/admin/Inventory";
import ContactPage from "../../features/contact/ContactPage";
import Login from "../../features/account/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            // Authenticated routes
            {
                element: <RequireAuth />, children: [
                    { path: 'checkout', element: <CheckoutWrapper /> },
                    { path: 'orders', element: <Orders /> },
                    { path: 'inventory', element: <Inventory /> }
                ]
            },
            // Admin routes
            {
                element: <RequireAuth roles={['Admin']} />, children: [
                    { path: 'inventory', element: <Inventory /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'basket', element: <BasketPage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
])