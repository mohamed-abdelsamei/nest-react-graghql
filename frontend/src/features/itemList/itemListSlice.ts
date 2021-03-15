import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../../app/store';
import { gql } from '@apollo/client';

import { Item, ItemListState } from './types';
import { client } from '../../app/graphql';

const POSTS_QUERY = gql`
  {
    posts {
      id
      text
      createdAt
    }
  }
`;

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const POST_MUTATION = gql`
  mutation createPost(

        $text:String!
    
    ){createPost(createPostInput:{text:$text}){
      id
      text
      createdAt
    }
  }
`;

const initialState: ItemListState = { posts: [] };

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Item>) {
            state.posts.push(action.payload);
        },
        setItems(state, action: PayloadAction<Item[]>) {
            console.log(action.payload)
            // state = action.payload;
            return { ...state, posts: action.payload }
        },

    }
});


export const addItem = (text: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        let { data } = await client.mutate({
            mutation: POST_MUTATION, variables: { text: text }
        })
        dispatch(itemSlice.actions.addItem(data.createPost))

    } catch (error) {
        console.log(error)
    }
}


export const fetchItems = (): AppThunk => async (dispatch: AppDispatch) => {

    let { data } = await client.query({
        query: POSTS_QUERY
    })
    console.log(data)
    // .then(result => { console.log(result); })
    //     .catch(err => { console.log(err) })
    dispatch(itemSlice.actions.setItems(data.posts || []))
}

export default itemSlice.reducer;