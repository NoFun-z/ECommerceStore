import { Button, Menu, Fade, MenuItem, Box } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { signout } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Button
                    color="inherit"
                    onClick={handleClick}
                    sx={{ typography: 'h6' }}
                >
                    {user?.email}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        '& .MuiMenu-list': {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                    }}
                >
                    <MenuItem component={Link} to='/orders'>My orders</MenuItem>
                    <MenuItem onClick={() => {
                        dispatch(signout());
                        dispatch(clearBasket());
                    }}>Logout</MenuItem>
                </Menu>
            </Box>
        </>
    );
}