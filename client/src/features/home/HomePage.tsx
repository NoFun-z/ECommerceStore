import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src="../../../public/images/hero1.jpg" alt="hero1" style={{ display: 'block', width: '100%', maxHeight: 700 }} />
                </div>
                <div>
                    <img src="../../../public/images/hero2.jpg" alt="hero2" style={{ display: 'block', width: '100%', maxHeight: 700 }} />
                </div>
                <div>
                    <img src="../../../public/images/hero3.jpg" alt="hero3" style={{ display: 'block', width: '100%', maxHeight: 700 }} />
                </div>
            </Slider>

            <Box display='flex' justifyContent='center' sx={{ p: 4 }}>
                <Typography variant="h1">
                    Welcome to the shop!
                </Typography>
            </Box>
        </>
    )
}