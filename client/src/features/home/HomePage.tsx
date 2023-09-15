import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Comment } from "../../app/models/comment";
import { Product } from "../../app/models/product";
import TinyProductCard from "../catalog/TinyProductCard";
import { Order } from "../../app/models/order";
import ProductCardClickable from "../catalog/ProductCardClickable";
import ContactIcon from "@mui/icons-material/ContactSupport";
import { useAppSelector } from "../../app/store/ConfigureStore";


export default function HomePage() {
    const [allComments, setAllComments] = useState<Comment[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
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
                setProducts(productsData);
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
    }, []);


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

    const top3Products = products.filter((prod) =>
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

    const top3BoughtProducts = products.filter((prod) =>
        latestProductIDs.includes(prod.id));

    const startIndex = 1;
    const endIndex = products.length;

    const randomIndex = Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
    const randomProduct: Product[] = products.filter(p => p.id === randomIndex);

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
                        {randomProduct.map(lmao => <ProductCardClickable key={lmao.id} product={lmao} />)}
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
            <Box
                sx={{
                    backgroundImage: `url("/images/hero2.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    marginTop: "2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Background color
                    padding: "2rem",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Typography variant="h3" sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    <span style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>New Marketing Strategy</span>
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                    <span style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
                        Discover our exciting new marketing plans that will boost your business to new heights. Whether you're looking to expand your reach, increase sales, or enhance your brand, we've got a plan for you.
                    </span>
                </Typography>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        {/* Plan 1 */}
                        <Paper elevation={3} sx={{ padding: "1rem", height: "100%" }}>
                            <Typography variant="h6" sx={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                                Basic Plan
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
                                Suitable for startups and small businesses.
                            </Typography>
                            <ContactIcon fontSize="large" color="primary" />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* Plan 2 */}
                        <Paper elevation={3} sx={{ padding: "1rem", height: "100%" }}>
                            <Typography variant="h6" sx={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                                Premium Plan
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
                                Ideal for growing businesses.
                            </Typography>
                            <ContactIcon fontSize="large" color="primary" />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* Plan 3 */}
                        <Paper elevation={3} sx={{ padding: "1rem", height: "100%" }}>
                            <Typography variant="h6" sx={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                                Enterprise Plan
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
                                Tailored solutions for large enterprises.
                            </Typography>
                            <ContactIcon fontSize="large" color="primary" />
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "2rem" }}
                >
                    Learn More
                </Button>
            </Box>
        </Container >
    )
}
