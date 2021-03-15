import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Item from './Item';
import { addItem, fetchItems } from './itemListSlice';

import classes from './ItemList.module.css'


export function ItemList() {
    const items = useSelector(
        (state: RootState) => state.items.posts
    );

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
    }, [dispatch])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={handleChange} />
                <button type="submit">Add Todo</button>
            </form>

            <h1>Items</h1>
            <ul className={classes.list}>
                {items.map(item => (
                    <Item key={item.id} {...item} />
                ))}
            </ul>
        </div>
    );
}