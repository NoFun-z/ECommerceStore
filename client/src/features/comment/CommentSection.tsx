import { Typography, Paper, Box, Avatar, Rating, Button } from "@mui/material"
import { Comment } from "../../app/models/comment"
import { Fragment, useEffect, useState } from "react"
import { formatDate } from "../../app/util/util"
import { useAppSelector } from "../../app/store/ConfigureStore"
import LoopIcon from '@mui/icons-material/Loop';
import PersonIcon from '@mui/icons-material/Person';
import { Product } from "../../app/models/product"

interface Props {
    productComment: Comment[]
    cmtBool: boolean
    setCmtBool: () => void
    comments: Comment[]
    product: Product
}


export default function CommentSection({ productComment, cmtBool, setCmtBool, comments, product }: Props) {
    const { user } = useAppSelector(state => state.account)

    let commentText = cmtBool ? "Your Reviews" : "Top Reviews"
    const personalReviews = comments.filter(c => c.buyerID === user?.userName && c.productID === product.id);
    const commentListClass = cmtBool ? "personal-comments" : "all-comments";

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <Fragment>
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 2 }}>{commentText}</Typography>
                {user && <Button variant="contained" onClick={() => setCmtBool()}><LoopIcon /></Button>}
            </Box>
            {productComment.length === 0 ? (
                <Typography
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {!cmtBool ? "No comments available" : "Add your first thoughts about the product"}
                </Typography>
            ) : (
                <div className={`${commentListClass} ${fadeIn ? 'fade-in' : ''}`}>
                    {(cmtBool ? personalReviews : productComment).map((comment, index) => (
                        <Paper key={index} elevation={3} sx={{ p: 2, mb: 1.5 }}>
                            <Box alignItems="center">
                                <Box sx={{ display: 'flex', mb: 1 }} alignItems="center">
                                    <Avatar sx={{ bgcolor: 'primary', marginRight: '10px' }}><PersonIcon/></Avatar> {/* Anonymized avatar */}
                                    <Typography variant="subtitle1">{comment.buyerID}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 1 }} alignItems="center">
                                    <Rating sx={{ marginRight: '10px' }} value={comment.rating} readOnly />
                                    <Typography><strong>{comment.title}</strong></Typography>
                                </Box>
                                <Typography variant="body2">{formatDate(comment.datePosted)}</Typography>
                                <Typography sx={{ marginTop: '10px' }} variant="body1">{comment.text}</Typography>
                            </Box>
                        </Paper>
                    ))}
                </div>
            )}
        </Fragment>
    )
}
