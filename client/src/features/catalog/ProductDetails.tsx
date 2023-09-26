import {
    Box,
    Divider,
    Grid,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
    useAppDispatch,
    useAppSelector,
} from "../../app/store/ConfigureStore";
import {
    addBasketItemAsync,
    removeBasketItemAsync,
} from "../basket/basketSlice";
import {
    fetchProductAsync,
    productSelector,
} from "./catalogSlice";
import ProductCardClickable from "./ProductCardClickable";
import CommentRating from "../comment/CommentRating";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { commentSelector, fetchCommentsAsync, setProductCommentParams } from "../comment/commentSlice";
import { Comment } from "../../app/models/comment";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
    const { basket, status } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector((state) =>
        productSelector.selectById(state, id!)
    );
    const { status: productStatus } = useAppSelector(
        (state) => state.catalog
    );
    const item = basket?.items.find((i) => i.productID === product?.id);
    const [quantity, setQuantity] = useState<number>(item?.quantity || 0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const comments = useAppSelector(commentSelector.selectAll).slice(0, 20);
    const { metaData } = useAppSelector((state) => state.comment);
    const [allComments, setAllComments] = useState<Comment[]>([])
    const [previousProduct, setPreviousProduct] = useState<Product>();
    const user = useAppSelector(state => state.account);
    const similarProducts = products
        .filter(
            (p) =>
                p.brand.toUpperCase() === product?.brand.toUpperCase() &&
                p.id !== parseInt(id || "", 10)
        )
        .slice(0, 4);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [similarProductsData, commentsData] = await Promise.all([
                    agent.Catalog.getAll(),
                    agent.Comments.getAll(),
                ]);
                setProducts(similarProductsData);
                // Filter and set comments related to the current product
                setAllComments(commentsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (!product && id) {
            dispatch(fetchProductAsync(parseInt(id, 10)));
        }

        if (product) {
            fetchData();
        }
    }, [dispatch, id, product]);

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity);
        }
    }, [item]);

    useEffect(() => {
        if (product && id && product.id !== previousProduct?.id) {
            dispatch(setProductCommentParams({ productID: product.id }));
            dispatch(fetchCommentsAsync());
            setPreviousProduct(product);
        }
    }, [dispatch, user, product, metaData]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = parseInt(event.target.value, 10);
        setQuantity(isNaN(inputValue) ? 0 : Math.max(inputValue, 0));
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product!.id, quantity: updatedQuantity }));
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product!.id, quantity: updatedQuantity }));
        }
    }

    const getDeliveryDateRange = () => {
        const today = new Date();
        const deliveryStartDate = new Date(today);
        const deliveryEndDate = new Date(today);
        deliveryStartDate.setDate(today.getDate() + 4);
        deliveryEndDate.setDate(today.getDate() + 6);

        const options = { month: 'long', day: 'numeric' };
        const options2 = { day: 'numeric' };
        const startDateString = deliveryStartDate.toLocaleDateString('en-US', options as any);
        const endDateString = deliveryEndDate.toLocaleDateString('en-US', options2 as any);

        return (
            <strong>
                {startDateString} - {endDateString}
            </strong>
        );
    };

    if (productStatus.includes('pending')) {
        return <LoadingComponent message="Loading product..." />;
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6} lg={4}>
                    <img src={product.pictureURL} alt={product.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h3">{product.name}</Typography>
                    <Rating
                        name={`half-rating-read-${product.id}`}
                        value={Math.round(product.averageRating * 2) / 2}
                        precision={0.5}
                        sx={{ marginTop: "10px", marginBottom: "auto" }}
                        readOnly
                    />
                    <Typography variant="body2">
                        {allComments ? `${allComments.filter(c => c.productID === (parseInt(id ?? ""))).length} rating${allComments.filter(c => c.productID === product.id).length !== 1 ? "s" : ""}` : '0 ratings'}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {product.discount === 0 ? (<Typography gutterBottom color='secondary' variant="h4">
                        {currencyFormat(product.price)}
                    </Typography>)
                        :
                        (<Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap' }} color='secondary' variant="h5">
                            <span style={{ textDecoration: 'line-through' }}>{currencyFormat(product.price)}</span>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {` ${currencyFormat(product.price - product.discount)}`} (25% OFF)
                            </span>
                        </Typography>)
                    }
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={12} lg={2}>
                    <Box sx={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                        <Typography variant="h6">After Tax: ${quantity > 0 ? (((product.price - product.discount) + ((product.price - product.discount) / 100 * 15)) * quantity / 100).toFixed(2) : 0}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography sx={{ marginBottom: '10px' }} >{product.price > 10000 ? "Free Deliver" : "$5 Delivery"} on {getDeliveryDateRange()}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label='Quantity in Cart'
                            fullWidth value={quantity}
                            sx={{ marginTop: '10px', marginBottom: '10px' }} />
                        <LoadingButton
                            loading={status.includes('pending')}
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            onClick={handleUpdateCart}
                            sx={{ height: '50px', marginTop: '10px', marginBottom: '10px', fontSize: '11px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={6} sx={{ mb: 5 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ mb: 5 }}>Other products from <strong>{product.brand}</strong></Typography>
                    <Grid container spacing={4}>
                        {similarProducts.map((Sproduct) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={Sproduct.id}>
                                {loading ? (<ProductCardSkeleton />) :
                                    <ProductCardClickable product={Sproduct} />}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ mb: 2 }} />
            <CommentRating product={product} allcomments={allComments} comments={comments} />
        </>
    )
}