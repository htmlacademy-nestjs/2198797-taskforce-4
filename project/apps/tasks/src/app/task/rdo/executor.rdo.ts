import { Expose } from 'class-transformer';

export class ExecutorRdo {

  @Expose()
  public failureTasks: number;

  @Expose()
  public doneTasks: number;
}