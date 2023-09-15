export interface Comment{
    productID: number,
    buyerID : string,
    title: string,
    text: string,
    rating: number | null
    datePosted: string
}

export interface ProductCommentParams{
    productID: number,
    pageNumber: number;
    pageSize: number;
}