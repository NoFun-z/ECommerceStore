import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe("pk_test_51Nh1mCHFwT6dWdaERBtGS7Zhj5On1ZcQjYChd6yhecZ6DGpyrox3OlBqIQDIxxttIinRLIrDBOuvU1RGlVudyiOS00fhbmkeNE")

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
     agent.Payments.createPaymentIntent()
     .then(basket => dispatch(setBasket(basket)))
     .catch(er => console.log(er))
     .finally(() => setLoading(false))  
    }, [dispatch]);

    if (loading) return <LoadingComponent message="Loading checkout..."/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}