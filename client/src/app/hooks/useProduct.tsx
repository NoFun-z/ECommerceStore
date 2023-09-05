import React from "react";
import { productSelector, fetchProductsAsync, fetchFilters } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/ConfigureStore";

export default function useProducts() {

    const products = useAppSelector(productSelector.selectAll);
    const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    React.useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    return (
        {
            products,
            productsLoaded,
            filtersLoaded,
            brands,
            types,
            metaData
        }
    )
}