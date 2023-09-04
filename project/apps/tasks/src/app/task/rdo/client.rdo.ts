import { Expose } from 'class-transformer';

export class ClientRdo {

  @Expose()
  public allTasks: number;

  @Expose()
  public newTasks: number;

}