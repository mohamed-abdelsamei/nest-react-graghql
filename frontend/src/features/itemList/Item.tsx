import React from 'react'

interface ItemProps {
    id: string,
    text: string,
    createdAt: string | number | Date
}

export default function Item({id, text, createdAt }: ItemProps) {
    return (
        <li
        >
            {id} - {text} - {new Date(+createdAt).toDateString()}
        </li>
    )
}