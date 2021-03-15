import React from 'react'
import classes from './ItemList.module.css'
interface ItemProps {
    id: string,
    text: string,
    createdAt: string | number | Date
}

export default function Item({id, text, createdAt }: ItemProps) {
    return (
        <li className={classes.item}
        >
            <span> {text}</span> <span>{new Date(+createdAt).toDateString()}</span>
        </li>
    )
}