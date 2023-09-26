import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { Comment, ProductCommentParams } from "../../app/models/comment"
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/ConfigureStore";
import agent from "../../app/api/agent";

interface CommentState {
    commentsLoaded: boolean;
    status: string;
    productCommentParams: ProductCommentParams;
    metaData: MetaData | null;
}

const commentsAdapter = createEntityAdapter<Comment>();

function getAxioxParams(productCommentParams: ProductCommentParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productCommentParams.pageNumber.toString());
    params.append('pageSize', productCommentParams.pageSize.toString());
    params.append('productID', productCommentParams.productID.toString());
    return params;
}

export const fetchCommentsAsync = createAsyncThunk<Comment[], void, { state: RootState }>(
    'comment/fetchCommentsAsync',
    async (_, thunkAPI) => {
        const params = getAxioxParams(thunkAPI.getState().comment.productCommentParams);
        try {
            const response = await agent.Comments.getComment(params);
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response.items;
        }
        catch (er: any) {
            return thunkAPI.rejectWithValue({ error: er.data })
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 5,
        productID: 0,
    }
}

export const commentSlice = createSlice({
    name: 'comment',
    initialState: commentsAdapter.getInitialState<CommentState>({
        commentsLoaded: false,
        status: 'idle',
        productCommentParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductCommentParams: (state, action) => {
            state.commentsLoaded = false;
            state.productCommentParams = { ...state.productCommentParams, ...action.payload};
        },
        setPageNumber: (state, action) => {
            state.commentsLoaded = false;
            state.productCommentParams = { ...state.productCommentParams, ...action.payload };
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetProductCommentParams: (state) => {
            state.productCommentParams = initParams();
        },
        setComments : (state, action) => {
            commentsAdapter.upsertOne(state, action.payload);
            state.commentsLoaded = false;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchCommentsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchCommentsAsync.fulfilled, (state, action) => {
            commentsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.commentsLoaded = true;
        });
        builder.addCase(fetchCommentsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
})


export const commentSelector = commentsAdapter.getSelectors((state: RootState) => state.comment);
export const { setComments, setProductCommentParams, resetProductCommentParams, setMetaData, setPageNumber } = commentSlice.actions;
