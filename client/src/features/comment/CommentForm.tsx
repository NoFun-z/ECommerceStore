import { useState } from 'react';
import { ProductRating } from '../../app/models/productRating';
import { fetchCommentsAsync, setComments } from './commentSlice';
import { Comment } from '../../app/models/comment';
import { useAppDispatch, useAppSelector } from '../../app/store/ConfigureStore';
import { FieldValues, useForm } from 'react-hook-form';
import AppTextInput from '../../app/components/ApptextInput';
import { Button, Rating, Stack, Typography } from '@mui/material';
import agent from '../../app/api/agent';
import { setProduct } from '../catalog/catalogSlice';
import { LoadingButton } from '@mui/lab';
import { Console } from 'console';

interface Props {
  productID: number;
  cancelReview: () => void;
  userCommentTimes: number;
}

export default function CommentForm({ productID, cancelReview, userCommentTimes }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(0);
  const { control, formState, handleSubmit} = useForm();

  async function handleSubmitData(data: FieldValues) {
    try {
      let newRating = {
        id: productID,
        averageRating: rating,
      };

      let commentResponse: Comment;
      let newComment = {
        productID: productID,
        buyerID: user?.userName || 'Annonymous',
        title: data.Title,
        text: data.Text,
        rating: rating,
      };
      const response = await agent.Comments.updateRating(newRating);
      commentResponse = await agent.Comments.createComment(newComment);
      dispatch(setProduct(response));
      dispatch(setComments(commentResponse));
      dispatch(fetchCommentsAsync());
      cancelReview();
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} style={{ textAlign: 'center' }}>
      <Typography variant="h6">Write a Review</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue!);
          }}
        />
        <AppTextInput
          control={control}
          name="Title"
          label="Title"
          rules={{ required: true }}
          inputProps={{ maxLength: 15}}/>

        <AppTextInput
          multiline={true}
          rows={4}
          control={control}
          name="Text"
          label="Say Something..."
        />
      </Stack>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={cancelReview}>
          Cancel
        </Button>
        <LoadingButton loading={formState.isSubmitting} variant="contained" type="submit" disabled={userCommentTimes > 2 || rating! < 1 || !formState.isValid}>
          Submit
        </LoadingButton>
      </Stack>
    </form>
  );
}
