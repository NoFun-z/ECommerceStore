import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/ConfigureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog)
    return (
        <Grid container spacing={4}>
            {products.map((prod) => (
                <Grid item xs={4} key={prod.id}>
                    {!productsLoaded ? (<ProductCardSkeleton />)
                        : (<ProductCard product={prod} />)}
                </Grid>
            ))}
        </Grid>
    )
}