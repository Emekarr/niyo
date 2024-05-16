export interface CreateTaskDTO {
  title: string;
  body: string;
}

export interface UpdateTaskDTO {
  title?: string;
  body?: string;
}
