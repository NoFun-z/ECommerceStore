import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/ConfigureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const gridSpacing = isMobile ? 2 : 4;

    return (
        <Grid container spacing={gridSpacing}>
            {products.map((prod) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={prod.id}>
                    {!productsLoaded ? (<ProductCardSkeleton />)
                        : (<ProductCard key={prod.id} product={prod} />)}
                </Grid>
            ))}
        </Grid>
    )
}