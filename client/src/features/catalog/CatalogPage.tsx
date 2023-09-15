import { Grid, Paper } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProduct";
import { useState } from "react";


const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
    const { products, brands, types, filtersLoaded, metaData } = useProducts();
    const { productParams } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();

    const [isOrdered, setIsOrdered] = useState(false);
    const [isFilterByBrand, setIsFilterByBrand] = useState(false);
    const [isFilterByType, setIsFilterByType] = useState(false);

    const handlePageChange = (page: number) => {
        dispatch(setPageNumber({ pageNumber: page }));
      };

    if (!filtersLoaded) return <LoadingComponent message="Loading products..." />

    return (
        <Grid container columnSpacing={2} sx={{ mb: 5 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper
                    sx={{ mb: 2, p: 1, cursor: "pointer" }}
                    onClick={() => setIsOrdered(!isOrdered)}
                >
                    <div style={{ marginLeft: "10px", marginRight: "10px", display: 'flex', justifyContent: 'space-between' }}>
                        <span>Order By</span>
                        <span className={`filter-arrow-icon ${isOrdered ? 'expanded' : ''}`}>&#9650;</span>
                    </div>
                </Paper>
                {isOrdered &&
                    (<Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(event) => {
                                handlePageChange(1);
                                dispatch(setProductParams({ orderBy: event }))
                            }}
                        />
                    </Paper>)}
                <Paper
                    sx={{ mb: 2, p: 1, cursor: "pointer" }}
                    onClick={() => setIsFilterByBrand(!isFilterByBrand)}
                >
                    <div style={{ marginLeft: "10px", marginRight: "10px", display: 'flex', justifyContent: 'space-between' }}>
                        <span>Filter By Brand</span>
                        <span className={`filter-arrow-icon ${isFilterByBrand ? 'expanded' : ''}`}>&#9650;</span>
                    </div>
                </Paper>
                {isFilterByBrand && (
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons
                            items={brands}
                            checked={productParams.brands!}
                            onChange={(items: string[]) => {
                                handlePageChange(1);
                                dispatch(setProductParams({ brands: items }))
                            }} />
                    </Paper>
                )}
                <Paper
                    sx={{ mb: 2, p: 1, cursor: "pointer" }}
                    onClick={() => setIsFilterByType(!isFilterByType)}
                >
                    <div style={{ marginLeft: "10px", marginRight: "10px", display: 'flex', justifyContent: 'space-between' }}>
                        <span>Filter By Type</span>
                        <span className={`filter-arrow-icon ${isFilterByType ? 'expanded' : ''}`}>&#9650;</span>
                    </div>
                </Paper>
                {isFilterByType &&
                    (<Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons
                            items={types}
                            checked={productParams.types!}
                            onChange={(items: string[]) => {
                                handlePageChange(1);
                                dispatch(setProductParams({ types: items }))
                            }} />
                    </Paper>)}
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                {metaData &&
                    <AppPagination
                        metaData={metaData}
                        onPageChange={handlePageChange} />}
                <ProductList products={products} /></Grid>
        </Grid >
    )
}