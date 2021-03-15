import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Item from './Item';
import { addItem, fetchItems } from './itemListSlice';

const GET_POSTS_QUERY = gql`
  {
    posts {
      id
      text
      createdAt
    }
  }
`;

export function ItemList() {
    const items = useSelector(
        (state: RootState) => state.items.posts
    );
    // const { data, loading, error } = useQuery(GET_POSTS_QUERY);

    const dispatch = useDispatch();

    const [title, setTitle] = useState("")
    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!title.trim()) {
            return
        }
        dispatch(addItem(title))

        setTitle('');
    }

    const handleChange = (e: { target: HTMLInputElement; }) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        dispatch(fetchItems())
    }, [])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={handleChange} />
                <button type="submit">Add Todo</button>
            </form>

            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <Item key={item.id} {...item} />
                ))}
            </ul>
        </div>
    );
}