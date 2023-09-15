import RatingDistribution from './RatingDistribution';
import { Button, Divider, Grid, Rating, Typography } from '@mui/material';
import { Product } from '../../app/models/product';
import CommentSection from './CommentSection';
import { useState } from 'react';
import CommentForm from './CommentForm';
import { Comment } from '../../app/models/comment';
import { useAppDispatch, useAppSelector } from '../../app/store/ConfigureStore';
import { Link } from 'react-router-dom';
import AppPagination from '../../app/components/AppPagination';
import { setPageNumber } from './commentSlice';
import { MetaData } from '../../app/models/pagination';

interface Props {
  product: Product
  allcomments: Comment[]
  comments: Comment[]
  metaData: MetaData
}

export default function CommentRating({ product, allcomments, comments, metaData }: Props) {
  const [showReview, setShowReview] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.account)
  const dispatch = useAppDispatch();
  const [cmtBool, setCmtBool] = useState(false)
  const pageNumber = useAppSelector((state) => state.comment.productCommentParams.pageNumber);

  function handleSetCmtBool() {
    setCmtBool(!cmtBool);
  }

  const userCommentTimes = comments?.filter(c => c.buyerID === user?.email).length;

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

  function CancelReviewForm() {
    setShowReview(false);
  }

  return (
    <Grid container spacing={8} sx={{ mb: '50px' }}>
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
        {!showReview ? <CommentSection productComment={comments} cmtBool={cmtBool} setCmtBool={handleSetCmtBool} />
          : user ? <CommentForm productID={product.id} cancelReview={CancelReviewForm} userCommentTimes={userCommentTimes} />
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
            onPageChange={(page: number) => {
              dispatch(setPageNumber(page))
              console.log(pageNumber)
            }} />}
      </Grid>
    </Grid>
  )
}
