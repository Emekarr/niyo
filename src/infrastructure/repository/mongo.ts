import mongoose, { Document, Model, Schema } from "mongoose";
import BaseError from "../../application/errors/BaseError";
import { PaginationQuery, Repository } from "./type";
import { generateUniqueID } from "../../application/utils";
import Logger from "../../application/loggers/Logger";
import { LoggerLevel } from "../../application/loggers/types";

export class BaseMongoRepository<T extends Document> implements Repository<T> {
  model: Model<T>;

  constructor(private name: string, schema: Schema) {
    this.model = mongoose.model<T>(name, schema);
  }

  /**
   *  Creates one or more documents
   * @param payload
   */
  async create(payload: T): Promise<T> {
    try {
      const result = await this.model.create(payload);
      return result;
    } catch (err: any) {
      if (err.code === 11000)
        throw new BaseError(`${this.name} exists already`, 409, false);
      throw new BaseError(err, 500, true);
    }
  }

  /**
   * Finds a document by it's id and filters required fields using projections
   * @param id
   * @param projections
   */
  async findByID(id: string, projections?: any): Promise<T> {
    const result = await this.model
      .findOne({
        id,
      })
      .select(projections)
      .exec();
    if (!result) throw new BaseError(`${this.name} not found`, 404, false);
    return result;
  }

  /**
   * Finds all documents that match a query
   * @param query
   * @param projections
   */
  async list(query: PaginationQuery, projections?: any): Promise<T[]> {
    const result = await this.model
      .find({
        ...query.conditions,
        deleted_at: undefined,
      })
      .select(projections)
      .exec();
    return result;
  }

  /**
   * Updates a document that matches a query and returns the updated document
   * @param condition
   * @param payload
   */
  async updateOne(condition: Record<string, any>, payload: any): Promise<T> {
    const result = await this.model.findOne<T>(condition);
    if (!result) throw new BaseError(`${this.name} not found`, 404, false);
    result.set(payload);
    const updatedDocument = await result.save();
    return updatedDocument;
  }

  /**
   * Soft deletes all documents that match the provided query and returns the updated document
   * @param condition
   */
  async remove(condition: Record<string, any>): Promise<T> {
    const result = await this.model.findOneAndUpdate(
      condition,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );
    if (!result) throw new BaseError(`${this.name} not found`, 404, false);
    return result;
  }
}
