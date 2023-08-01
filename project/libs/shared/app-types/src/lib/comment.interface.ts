export interface Comment {
    _id?: string;
    text: string;
    creationDate: Date;
    taskId: string;
    userId: string;
}