import { Container, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Comment } from "../../app/models/comment";
import { Product } from "../../app/models/product";
import TinyProductCard from "../catalog/TinyProductCard";
import { Order } from "../../app/models/order";
import ProductCardClickable from "../catalog/ProductCardClickable";
import { useAppSelector } from "../../app/store/ConfigureStore";
import HomeStrategy from "./HomeStrategy";
import useProducts from "../../app/hooks/useProduct";


export default function HomePage() {
    const [allComments, setAllComments] = useState<Comment[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const {products} = useProducts();
    const [orders, setOrders] = useState<Order[] | null>(null);
    const user = useAppSelector(state => state.account);

    useEffect(() => {
        // Fetch similar products and comments here
        const fetchData = async () => {
            try {
                const [productsData, commentsData] = await Promise.all([
                    agent.Catalog.getAll(),
                    agent.Comments.getAll(),
                ]);
                setAllProducts(productsData);
                setAllComments(commentsData);
            } catch (error) {
                console.error(error);
            }
        };

        if (user !== null) {
            agent.Orders.list()
                .then(orders => setOrders(orders))
                .catch(er => console.log(er))
        }

        fetchData();
    }, [user, products]);


    const productRatings: Record<number, { totalRating: number; count: number }> =
        allComments.reduce(
            (result, comment) => {
                if (!result[comment.productID]) {
                    result[comment.productID] = {
                        totalRating: 0,
                        count: 0,
                    };
                }

                if (comment.rating !== null) {
                    result[comment.productID].totalRating += comment.rating;
                    result[comment.productID].count += 1;
                }

                return result;
            },
            {} as Record<number, { totalRating: number; count: number }>
        );

    const averageRatings: { productID: number; averageRating: number }[] = Object.keys(
        productRatings
    ).map((productID) => ({
        productID: parseInt(productID, 10),
        averageRating:
            productRatings[parseInt(productID, 10)].totalRating /
            productRatings[parseInt(productID, 10)].count,
    }));

    averageRatings.sort((a, b) => b.averageRating - a.averageRating);
    const top3ProductIDs: number[] = averageRatings
        .slice(0, 3)
        .map((item) => item.productID);

    const top3Products = allProducts.filter((prod) =>
        top3ProductIDs.includes(prod.id)
    );

    const latestProductIDs: number[] = [];

    if (orders) {
        for (const order of orders) {
            for (const orderItem of order.orderItems) {
                if (latestProductIDs.length >= 3) {
                    break;
                }

                latestProductIDs.push(orderItem.productID);
            }
            if (latestProductIDs.length >= 3) {
                break;
            }
        }
    }

    const top3BoughtProducts = allProducts.filter((prod) =>
        latestProductIDs.includes(prod.id));

    const sortedRating = allProducts;
    const todayDeal = sortedRating.sort((a, b) => b.averageRating - a.averageRating).slice(0, 1);

    return (
        <Container style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            padding: "16px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}>
            <Typography variant={"h1"} style={{ textAlign: "center", fontSize: "3rem", marginTop: "1.5rem" }}>
                Every Snowflake is Unique, Just Like Our Deals!
            </Typography>
            <img
                src="/images/logo.png"
                alt="true-logo"
                style={{
                    maxWidth: "200px",
                    display: "block",
                    margin: "1.5rem auto 2rem auto",
                }}
            />


            <Grid container spacing={3} justifyContent="center">
                {top3ProductIDs.length > 0 &&
                    <Grid item xs={12} sm={10} md={6} lg={4}>
                        <Paper sx={{ padding: '10px' }}>
                            <Typography style={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                textAlign: "center",
                                fontSize: "2rem"
                            }} variant="h3" >Top Rated Products</Typography>
                            <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '25px' }}>
                                {top3Products.map((prod) => (
                                    <Grid item key={prod.id} xs={6} sm={5} md={5} lg={6}>
                                        <TinyProductCard product={prod} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>}
                <Grid item xs={12} sm={10} md={6} lg={4}>
                    <Paper sx={{ padding: '10px' }}>
                        <Typography style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            textAlign: "center",
                            fontSize: "2rem"
                        }} variant="h3" >Today's Deal</Typography>
                        {todayDeal.map(deal => <ProductCardClickable key={deal.id} product={deal} />)}
                    </Paper>
                </Grid>
                {top3BoughtProducts.length > 0 &&
                    <Grid item xs={12} sm={10} md={6} lg={4}>
                        <Paper sx={{ padding: '10px' }}>
                            <Typography style={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                textAlign: "center",
                                fontSize: "2rem"
                            }} variant="h3" >Buy Again</Typography>
                            <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '25px' }} >
                                {top3BoughtProducts.map((prod) => (
                                    <Grid item key={prod.id} xs={6} sm={5} md={5} lg={6}>
                                        <TinyProductCard product={prod} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>}
            </Grid>
            <HomeStrategy/>
        </Container >
    )
}
