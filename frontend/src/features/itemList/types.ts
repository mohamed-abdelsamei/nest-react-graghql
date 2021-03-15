export interface Item {
    id: string,
    createdAt: string | number | Date
    text: string,
}

export interface ItemListState{
    posts:Item[]
}