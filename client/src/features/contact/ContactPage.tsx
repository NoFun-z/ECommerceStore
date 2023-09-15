import {
  Avatar,
  Grid,
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';

export default function ContactPage() {
  return (
    <Box mt={3}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Working Hours
              </Typography>
            </Box>
            <Typography variant="body1">
              Monday - Friday: 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body1">
              Saturday: 10:00 AM - 4:00 PM
            </Typography>
            <Typography variant="body1">Sunday: Closed</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Our Locations
              </Typography>
            </Box>
            <Typography variant="body1">
              Main Office: 1234 Company St, Cityville
            </Typography>
            <Typography variant="body1">
              Branch Office: 5678 Business Ave, Townsville
            </Typography>
            <Typography variant="body1">
              Operation: Owned By NoFun Inc
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', marginTop: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="Company Logo"
            src="/images/avatar.jpg"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1">
            "Delivering excellence in every product and service we offer."
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Our Daily Tasks
          </Typography>
          <Typography variant="body1">
            "We strive provide the best customer support they could ever experienced."
          </Typography>
        </Box>
      </Paper>

      <Box mt={3}>
        <Typography style={{ marginBottom: '1.5rem' }} variant="h5" gutterBottom>
          Customer Support - Most Asked Questions
        </Typography>
        <Accordion elevation={3} sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ marginRight: '10px' }}>Return Policy</Typography>
              <HelpIcon />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Our return policy allows you to return items within 30 days of purchase if you are not satisfied with your order. The product should be in its original condition with all tags attached.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={3} sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ marginRight: '10px' }}>What if I lost track of my items</Typography>
              <HelpIcon />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If you have lost track of your items or need assistance with tracking your order, please contact our customer support team. They will be happy to help you locate your package and provide updates on its status.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={3} sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ marginRight: '10px' }}>What if my order didn't come</Typography>
              <HelpIcon />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              In the rare event that your order doesn't arrive within the expected delivery time, please reach out to our customer support team. We will investigate the issue and ensure you receive your order or a suitable resolution.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>


      <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Connect with Us
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item>
            <a href="https://www.facebook.com/hoangloc.pham.921/" target="_blank" rel="noopener noreferrer">
              <FacebookIcon sx={{ fontSize: 60 }} /> {/* Adjust the fontSize as needed */}
            </a>
          </Grid>
          <Grid item>
            <a href="https://www.instagram.com/just.l.00/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon sx={{ fontSize: 60 }} /> {/* Adjust the fontSize as needed */}
            </a>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}
