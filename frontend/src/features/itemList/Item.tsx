import React from 'react'
import { User } from '../signUp/types'
import classes from './ItemList.module.css'
interface ItemProps {
    id: string,
    text: string,
    user?:User;
    createdAt: string | number | Date
}

export default function Item({ id, text, createdAt, user }: ItemProps) {
    return (
        <li className={classes.item}
        >
                <span>{text} -  {user?.name}</span>
            
            <span>{new Date(+createdAt).toDateString()}</span>
        </li>
    )
}