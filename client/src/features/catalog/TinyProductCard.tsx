import { Avatar, Card, CardContent, CardHeader, CardMedia, Rating, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
interface Props {
    product: Product;
}

export default function TinyProductCard({ product }: Props) {
    return (
        <Link to={`/catalog/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card style={{ maxWidth: "150" }}>
                <CardMedia
                    sx={{ height: 100, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                    image={product.pictureURL}
                    title={product.name}
                />
                <CardContent sx={{ paddingBottom: '5px' }}>
                    <Typography variant="body2" color="text.secondary">
                        {product.description.length > 80
                            ? `${product.description.substring(0, 24)}...`
                            : product.description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}