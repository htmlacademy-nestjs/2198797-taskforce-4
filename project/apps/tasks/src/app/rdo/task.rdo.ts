import { Expose } from 'class-transformer';

export class TaskRdo {
    @Expose({name: '_id'})
    public id: string;

    @Expose()
    public name: string;

    @Expose()
    public description: string;

    @Expose()
    public category: string;

    @Expose()
    public price: string;

    @Expose()
    public creationDate: string;

    @Expose()
    public deadline: string;

    @Expose()
    public picture: string;

    @Expose()
    public address: string;

    @Expose()
    public tags: string;

    @Expose()
    public city: string;

    @Expose()
    public userId: string;
}