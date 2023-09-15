import { RootState } from "../../app/store/ConfigureStore";

export const calculateProductPage = (state: RootState, productId: number | undefined) => {
    const { productParams } = state.catalog;
    const { pageSize } = productParams;
    const productIds = Object.keys(state.catalog.entities).map(Number);
    const productIndex = productIds.indexOf(productId ?? 0);
    
    if (productIndex === -1) {
      // Product not found in the catalog
      return null;
    }
  
    // Calculate the page number based on the product's index and page size
    const pageNumber = Math.floor(productIndex / pageSize) + 1;
  
    return pageNumber;
  };
  