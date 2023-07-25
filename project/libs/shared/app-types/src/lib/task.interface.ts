export interface Task {
    _id?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    deadline: Date;
    picture: string;
    address: string;
    tags: string;
    city: string;
}