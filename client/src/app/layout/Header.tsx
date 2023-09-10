import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, Box, List, ListItem, Switch, Toolbar, Typography, Drawer, Divider, Hidden, ListItemText, Menu } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/ConfigureStore";
import SignedInMenu from "./SignedInMenu";
import { useState } from "react";

interface Props {
    darkMode: boolean;
    ThemeChangeHandler: () => void;
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    marginRight: '12px',
    position: 'relative', // Add relative positioning
    '&:hover': {
        color: 'grey.500',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    },
    '&.active': {
        color: 'text.secondary',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-5px', // Adjust this value to control the underline position
            left: 0,
            right: 0,
            height: '2px', // Adjust the thickness of the underline
            backgroundColor: 'text.secondary', // Color of the underline
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)', // Add a stronger glowing effect for active links
        },
    },
};


export default function Header({ darkMode, ThemeChangeHandler }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account)
    const itemCount = basket?.items?.reduce((sum, item) => sum + item.quantity, 0)

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                {/* Logo and Theme Switch */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" component={NavLink} to="/">
                        <img src="/images/SNOWFAKE_Logo.png" alt="Logo" width="150" />
                    </Typography>
                    <Switch checked={darkMode} onChange={ThemeChangeHandler} />
                </Box>
                <Hidden lgUp>
                    {/* Shopping Cart and User Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton component={Link} to="basket" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {/* Render burger icon only on medium and small screens */}
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                            Fuck
                        </IconButton>
                    </Box>
                </Hidden>
                <Hidden lgDown>
                    {/* Render midLinks on large screens */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <List sx={{ display: 'flex' }}>
                            {midLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                            {user && user.roles?.includes('Admin') &&
                                <ListItem
                                    component={NavLink}
                                    to={'/inventory'}
                                    sx={navStyles}
                                >
                                    INVENTORY
                                </ListItem>
                            }
                        </List>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton component={Link} to="basket" size='large' edge='start' color="inherit" sx={{ mr: 2 }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {user ? (
                            <SignedInMenu />
                        ) : (
                            <List sx={{ display: 'flex' }}>
                                {rightLinks.map(({ title, path }) => (
                                    <ListItem
                                        component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={navStyles}
                                    >
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Hidden>
            </Toolbar>

            {/* Drawer for the Dropdown Menu */}
            <Drawer anchor="top" open={menuOpen} onClose={toggleMenu} sx={{ top: '64px', width: '30%', maxWidth: '300px', margin: 'auto' }}>
                <Box sx={{ textAlign: 'center' }}>
                    {user ? <SignedInMenu /> : null}
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                <ListItemText primary={title.toUpperCase()} sx={{ textAlign: 'center' }} />
                            </ListItem>
                        ))}
                        {user && user.roles?.includes('Admin') &&
                            <ListItem
                                component={NavLink}
                                to={'/inventory'}
                                sx={navStyles}
                            >
                                <ListItemText primary="INVENTORY" sx={{ textAlign: 'center' }} />
                            </ListItem>
                        }
                    </List>
                    {!user && (
                        <>
                            <Divider />
                            <List sx={{ display: 'flex' }}>
                                {rightLinks.map(({ title, path }) => (
                                    <ListItem
                                        component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={navStyles}
                                        onClick={toggleMenu}
                                    >
                                        <ListItemText primary={title.toUpperCase()} sx={{ textAlign: 'center' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </Box>
            </Drawer>
        </AppBar>
    );
}