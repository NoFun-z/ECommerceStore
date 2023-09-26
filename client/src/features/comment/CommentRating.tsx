import RatingDistribution from './RatingDistribution';
import { Button, Divider, Grid, Rating, Typography } from '@mui/material';
import { Product } from '../../app/models/product';
import CommentSection from './CommentSection';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { Comment } from '../../app/models/comment';
import { useAppDispatch, useAppSelector } from '../../app/store/ConfigureStore';
import { Link } from 'react-router-dom';
import AppPagination from '../../app/components/AppPagination';
import { setPageNumber } from './commentSlice';

interface Props {
  product: Product
  allcomments: Comment[]
  comments: Comment[]
}

export default function CommentRating({ product, allcomments, comments}: Props) {
  const [showReview, setShowReview] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.account)
  const dispatch = useAppDispatch();
  const [cmtBool, setCmtBool] = useState(false)
  const { metaData } = useAppSelector((state) => state.comment);
  const [currentPage, setCurrentPage] = useState(1); // Maintain current page separately

  function handleSetCmtBool() {
    setCmtBool(!cmtBool);
  }

  const userCommentTimes = allcomments?.filter(c => c.buyerID === user?.userName &&
     c.productID === product?.id).length;

  const totalRatings = comments?.length ?? 0;
  const numberOfFiveStarRatings = comments.filter(c => c.rating === 5).length ?? 0;
  const numberOfFourStarRatings = comments.filter(c => c.rating === 4).length ?? 0;
  const numberOfThreeStarRatings = comments.filter(c => c.rating === 3).length ?? 0;
  const numberOfTwoStarRatings = comments.filter(c => c.rating === 2).length ?? 0;
  const numberOfOneStarRatings = comments.filter(c => c.rating === 1).length ?? 0;

  const ratings = [
    { star: 5, count: numberOfFiveStarRatings },
    { star: 4, count: numberOfFourStarRatings },
    { star: 3, count: numberOfThreeStarRatings },
    { star: 2, count: numberOfTwoStarRatings },
    { star: 1, count: numberOfOneStarRatings },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
    dispatch(setPageNumber({ pageNumber: page }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [comments]);

  function CancelReviewForm() {
    setShowReview(false);
  }

  // Calculate the start and end indexes of products for the current page
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedComments = comments.slice(startIndex, endIndex);

  return (
    <Grid container spacing={5.5} sx={{ mb: '50px' }}>
      <Grid item xs={12} sm={12} md={4}>
        <Typography variant='h6'>Customer Reviews</Typography>
        <Rating
          name={`half-rating-read-${product.name}`}
          value={Math.round(product.averageRating * 2) / 2}
          precision={0.5}
          sx={{ marginTop: "10px", marginBottom: "auto" }}
          readOnly
        />
        <Typography sx={{ mb: 1 }}><strong>{product.averageRating > 0 ? product.averageRating.toFixed(1) : 0} out of 5</strong></Typography>
        <Typography sx={{ mb: 3 }}>{allcomments ? `${allcomments.filter(a => a.productID === product.id).length}
         global rating${allcomments.filter(a => a.productID === product.id).length !== 1 ? "s" : ""}`
          : '0 global ratings'}</Typography>
        <RatingDistribution ratings={ratings} totalRatings={totalRatings} />
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h6'>Review this product</Typography>
        <Typography>Share your thoughts with other customers</Typography>
        <Button
          disabled={userCommentTimes > 2}
          sx={{
            textAlign: 'center', padding: '15px', marginBottom: '10px',
            marginTop: '15px', borderRadius: '5px'
          }} variant='contained' onClick={() => setShowReview(true)}>{userCommentTimes > 2 ?
            "Only 3 Reviews Allowed" : "Write a customer review"}</Button>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        {!showReview ? <CommentSection productComment={displayedComments} cmtBool={cmtBool} 
        setCmtBool={handleSetCmtBool} comments={allcomments} product={product} />
          : user ? <CommentForm productID={product.id} cancelReview={CancelReviewForm}
           userCommentTimes={userCommentTimes} />
            : (
              <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography>Please <strong><Link style={{ textDecoration: 'none' }}
                  to={"/login"}>Sign In</Link></strong> to start rating</Typography>
                <Button variant='contained' sx={{ textAlign: 'center', padding: '10px 20px', marginTop: '10px' }} onClick={CancelReviewForm}>Back</Button>
              </div>
            )}
      </Grid>
      <Grid item xs={12} sm={12} md={4}></Grid>
      <Grid item xs={12} sm={12} md={8}>
        {metaData && !cmtBool && !showReview && comments.length > 0 &&
          <AppPagination
            metaData={metaData}
            onPageChange={handlePageChange} />}
      </Grid>
    </Grid>
  )
}
