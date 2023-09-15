import React from 'react';
import { Grid, Typography, Paper, Stack, Button, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

export default function AboutPage() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
            <Slider {...settings}>
              <div>
                <img src="/images/hero1.jpg" alt="hero1" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
              </div>
              <div>
                <img src="/images/hero3.jpg" alt="hero3" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
              </div>
            </Slider>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              <strong>About Our Winter Gear Company</strong>
            </Typography>
            <Typography variant="body1">
              Welcome to our winter gear company, where we are dedicated to providing high-quality winter essentials.
              Our journey began several years ago with a simple idea: to keep you warm and stylish during the cold season.
              Today, we are proud to be a leader in the industry, known for our winter hats, snowboards, boots, and gloves.
            </Typography>
            <Typography variant="body1">
              Our mission is to create value for winter enthusiasts by delivering innovative, cozy solutions that exceed expectations.
              We are committed to sustainability, integrity, and continuous improvement in everything we do.
            </Typography>
            <Button
              component={Link}
              to={"/catalog"}
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              href="/catalog" // Link to the catalog page
            >
              Explore Our Products
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Information */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          <strong>Our Values</strong>
        </Typography>
        <Typography variant="body1">
          At our winter gear company, we uphold a set of core values that guide our actions and decisions:
        </Typography>
        <ul>
          <li>Customer-Centric Approach</li>
          <li>Innovation and Excellence</li>
          <li>Integrity and Transparency</li>
          <li>Environmental Responsibility</li>
        </ul>
        <Typography variant="body1">
          These values are at the heart of everything we do and reflect our commitment to our customers and the environment.
        </Typography>
      </Paper>

      {/* Contact Information */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          <strong>Contact Us</strong>
        </Typography>
        <Typography variant="body1">
          If you have any questions or inquiries, please don't hesitate to get in touch with us.
          We'd love to hear from you!
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button component={Link} to={"/contact"} variant="outlined" color="primary">
            <ModeCommentIcon style={{ marginRight: '10px' }} /> Let's Chat
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
