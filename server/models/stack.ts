import {Model, DataTypes} from 'sequelize';
import {dbType} from './index';
import {sequelize} from './sequelize';

class Stack extends Model {
    public readonly id!: number; 
    public stack_name!: string;
}

Stack.init({
    stack_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    sequelize,
    modelName: 'Stack',
    tableName: 'stacks',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {

};

export default Stack;