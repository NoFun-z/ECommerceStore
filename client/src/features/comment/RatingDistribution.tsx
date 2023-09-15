import { Box, Rating } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

type Rating = {
  star: number;
  count: number;
};

interface Props {
  ratings: Rating[];
  totalRatings: number;
}

export default function RatingDistribution({ ratings, totalRatings }: Props) {

  return (
    <Box sx={{ mb: 5 }}>
      {ratings.map((rating) => (
        <Box key={rating.star}>
          <div>
            {rating.star} Star
            <span style={{ float: "right" }}>
              {totalRatings
                ? `${Math.ceil((rating.count / totalRatings) * 100)}%`
                : "0%"}
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={totalRatings
              ? Math.ceil((rating.count / totalRatings) * 100)
              : 0}
            sx={{
              marginBottom: 1.5,
              height: 8, // Adjust the height
              backgroundColor: 'primary', // Change the background color
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'primary', // Change the progress bar color
              },
            }}
          />

        </Box>
      ))}
    </Box>
  );
};
