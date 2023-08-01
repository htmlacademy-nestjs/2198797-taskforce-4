import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';
import { randomUUID } from 'node:crypto';


export class TaskMemoryRepository implements CRUDRepository<TaskEntity, string, Task>{
    private repository: Record<string, Task> = {};

    public async create(item: TaskEntity): Promise<Task> {
        const entry = { ...item.toObject(), _id: randomUUID() };
        this.repository[entry._id] = entry;
        return entry;
    }

    public async findById(id: string): Promise<Task | null> {
        if (this.repository[id]) {
            return { ...this.repository[id] };
        }

        return null;
    }

    public async destroy(id: string): Promise<void> {
        delete this.repository[id];
    }

    public async update(id: string, item: TaskEntity): Promise<Task> {
        this.repository[id] = { ...item.toObject(), _id: id };
        return this.findById(id);
    }

}
