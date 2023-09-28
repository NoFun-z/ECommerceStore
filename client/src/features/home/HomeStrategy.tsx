import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import ContactIcon from "@mui/icons-material/ContactSupport";

export default function HomeStrategy() {
    const [showPlanDetails, setShowPlanDetails] = useState(false);

    const togglePlanDetails = () => {
        setShowPlanDetails(!showPlanDetails);
    };

    return (
        <Box
            sx={{
                backgroundImage: `url("/images/hero2.jpg")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                marginTop: "2rem",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
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
                <Grid item xs={12} sm={12} md={4}>
                    {/* Plan 1 */}
                    <Paper elevation={3} sx={{ padding: "1rem", height: "100%", backgroundColor: "#fcfcfc" }}>
                        <Typography variant="h6" sx={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>
                            Basic Plan
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "0.5rem", color: "#555" }}>
                            The <strong>Basic Plan</strong> is perfect for startups and small businesses looking to establish their online presence.
                        </Typography>
                        <ContactIcon fontSize="large" color="primary" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    {/* Plan 2 */}
                    <Paper elevation={3} sx={{ padding: "1rem", height: "100%", backgroundColor: "#f4f4f4" }}>
                        <Typography variant="h6" sx={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>
                            Premium Plan
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "0.5rem", color: "#555" }}>
                            The <strong>Premium Plan</strong> is designed for growing businesses that need advanced marketing tools and strategies.
                        </Typography>
                        <ContactIcon fontSize="large" color="primary" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    {/* Plan 3 */}
                    <Paper elevation={3} sx={{ padding: "1rem", height: "100%", backgroundColor: "#ececec" }}>
                        <Typography variant="h6" sx={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>
                            Enterprise Plan
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "0.5rem", color: "#555" }}>
                            The <strong>Enterprise Plan</strong> is tailored for large enterprises with specific marketing needs.
                        </Typography>
                        <ContactIcon fontSize="large" color="primary" />
                    </Paper>
                </Grid>
            </Grid>

            {/* Plan Details Section */}
            <div className={showPlanDetails ? "planDetailsexpanded" : "planDetailshidden"}>
                <Box
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        padding: "2rem",
                        marginTop: "2rem",
                    }}
                >
                    <Typography variant="h4" sx={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#333" }}>
                        Plan Details
                    </Typography>

                    <Typography sx={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>
                        <strong>Basic Plan:</strong> The Basic Plan is ideal for startups and small businesses.
                        It includes website design and development, social media setup, email marketing, and basic SEO.
                        This plan is designed to establish your online presence and attract your target audience.
                    </Typography>

                    <Typography sx={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>
                        <strong>Premium Plan:</strong> Our Premium Plan is tailored for growing businesses.
                        It offers advanced features such as personalized marketing campaigns, SEO optimization,
                        and social media advertising. With the Premium Plan, you'll have access to detailed analytics
                        and customer segmentation tools to drive sales and expand your reach.
                    </Typography>

                    <Typography sx={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#333" }}>
                        <strong>Enterprise Plan:</strong> The Enterprise Plan is designed for large enterprises with
                        specific marketing needs. It provides custom solutions, dedicated support, and advanced
                        analytics. With A/B testing and 24/7 customer support, the Enterprise Plan ensures your
                        marketing strategies are optimized for success in a competitive market.
                    </Typography>
                </Box>
            </div>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "3rem" }}
                onClick={togglePlanDetails}
            >
                {showPlanDetails ? "Hide Details" : "Learn More"}
            </Button>
        </Box>
    );
}
