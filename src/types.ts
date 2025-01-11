export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    date: string;
}


export interface Todos {
    [key: string]: TodoItem[];
}