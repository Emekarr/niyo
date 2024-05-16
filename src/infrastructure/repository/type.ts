export interface PaginationQuery {
  conditions: Record<string, any>;
  limit?: number;
  sort?: string;
}

export interface Repository<T> {
  create(payload: any): Promise<T>;
  findByID(id: string, projections?: any, archived?: boolean): Promise<T>;
  list(query: PaginationQuery): Promise<T[]>;
  findOne(query: Record<string, any>): Promise<T | null>;
  updateOne(condition: Record<string, any>, update: any): Promise<T>;
  remove(condition: Record<string, any>): Promise<T>;
}
