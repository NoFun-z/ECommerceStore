import { Remove, Add, Delete } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@mui/material";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector, useAppDispatch } from "../../app/store/ConfigureStore";

interface Props {
    items: BasketItem[],
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isBasket &&
                            <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((row) => (
                        <TableRow
                            key={row.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={row.pictureUrl} alt={row.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{row.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{(row.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                {isBasket &&
                                    <Button
                                        // loading={status === ('pendingRemoveItem' + item.productId + 'rem')}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: row.productId, quantity: 1, name: 'rem' }))}
                                        color='error'>
                                        <Remove />
                                    </Button>}
                                {row.quantity}
                                {isBasket &&
                                    <Button
                                        // loading={status === ('pendingAddItem' + row.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: row.productId }))}
                                        color='secondary'>
                                        <Add />
                                    </Button>}
                            </TableCell>
                            <TableCell align="right">{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell align="right">
                                    <Button
                                        //loading={status === ('pendingRemoveItem' + row.productId + 'del')}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: row.productId, quantity: row.quantity, name: 'del' }))}
                                        color='error'>
                                        <Delete />
                                    </Button>
                                </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}