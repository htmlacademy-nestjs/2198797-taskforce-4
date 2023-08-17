import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';



export class TaskMemoryRepository implements CRUDRepository<TaskEntity, number, Task>{
  private repository: Record<string, Task> = {};

  public async create(item: TaskEntity): Promise<Task> {
    const entry = { ...item.toObject(), id: Math.floor(Math.random()) };
    this.repository[entry.id] = entry;
    return entry;
  }

  public async findById(id: number): Promise<Task | null> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async destroy(id: number): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: number, item: TaskEntity): Promise<Task> {
    this.repository[id] = { ...item.toObject(), id: id };
    return this.findById(id);
  }

}
