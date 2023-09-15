import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Rating, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Comment } from "../../app/models/comment";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch();
    const [allComments, setAllComments] = useState<Comment[]>([])

    useEffect(() => {
        agent.Comments.getAll()
            .then(comments => setAllComments(comments))
            .catch(er => console.log(er))
    }, [])

    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {product.name.charAt(0).toLocaleUpperCase()}
                </Avatar>
            }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: '#46a3b4' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureURL}
                title={product.name}
            />
            <CardContent sx={{ paddingBottom: '5px' }}>
                <Typography gutterBottom color='secondary' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description.length > 80
                        ? `${product.description.substring(0, 80)}...`
                        : product.description}
                </Typography>
                <Rating
                    name={`half-rating-read-${product.id}`}
                    value={Math.round(product.averageRating * 2) / 2}
                    precision={0.5}
                    sx={{ marginTop: "10px", marginBottom: "auto" }}
                    readOnly
                />
                <Typography variant="body2" color="text.secondary">
                    {allComments ? `${allComments.filter(c => c.productID === product.id).length} global review${allComments.filter(c => c.productID === product.id).length !== 1 ? "s" : ""}` : '0 global reviews'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button sx={{ color: '#46a3b4' }} onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))} size="small">Add to cart</Button>
                <Button sx={{ color: '#46a3b4' }} component={Link} to={`/catalog/${product.id}`} size="small">Details</Button>
            </CardActions>
        </Card>
    )
}