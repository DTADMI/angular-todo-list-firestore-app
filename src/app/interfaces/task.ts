export interface BaseTask {
  name: string;
  description?: string;
  isDone: boolean;
  dueDate?: string;
  subtasks?: Array<string>;
  superTask?: string;
  userId: string
}

export interface Task extends BaseTask {
  id: string;
  creationDate: string;
  lastModificationDate?: string;
  uri?: string
}

export interface TaskResult {
  _metadata? : {
    page: number;
    per_page: number;
    page_count: number;
    total_count: number;
    Links: (
      {self: string}|
      {first: string}|
      {previous : string}|
      {next: string}|
      {last: string}
      )[]
  };
  data: Task[];
}
