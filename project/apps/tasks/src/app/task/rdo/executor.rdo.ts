import { Expose } from 'class-transformer';

export class ExecutorRdo {

  @Expose()
  public rating: number;

  @Expose()
  public failureTasks: number;

  @Expose()
  public doneTasks: number;
}