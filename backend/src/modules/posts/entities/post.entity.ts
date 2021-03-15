import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;
}
