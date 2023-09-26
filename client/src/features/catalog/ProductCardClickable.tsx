import { Avatar, Card, CardContent, CardHeader, CardMedia, Rating, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { Comment } from "../../app/models/comment";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";

interface Props {
    product: Product;
}

export default function ProductCardClickable({ product }: Props) {
    const [allComments, setAllComments] = useState<Comment[]>([])

    useEffect(() => {
        agent.Comments.getAll()
            .then(comments => setAllComments(comments))
            .catch(er => console.log(er))
    }, [])

    return (
        <Link to={`/catalog/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    {product.discount === 0 ? (<Typography gutterBottom color='secondary' variant="h5">
                        {currencyFormat(product.price)}
                    </Typography>)
                        :
                        (<Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap' }} color='secondary' variant="h6">
                            <span style={{ textDecoration: 'line-through' }}>{currencyFormat(product.price)}</span>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {` ${currencyFormat(product.price - product.discount)}`} (25%)
                            </span>
                        </Typography>)
                    }
                    <Typography variant="body2" color="text.secondary">
                        {product.description.length > 80
                            ? `${product.description.substring(0, 80)}...`
                            : product.description}
                    </Typography>
                    <Rating
                        name={`half-rating-read-${product.brand}`}
                        value={Math.round(product.averageRating * 2) / 2}
                        precision={0.5}
                        sx={{ marginTop: "10px", marginBottom: "auto" }}
                        readOnly
                    />
                    <Typography variant="body2" color="text.secondary">
                        {allComments ? `${allComments.filter(c => c.productID === product.id).length} global review${allComments.filter(c => c.productID === product.id).length !== 1 ? "s" : ""}` : '0 global reviews'}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}