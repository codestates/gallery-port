import {Model, DataTypes} from 'sequelize';
import {dbType} from './index';
import {sequelize} from './sequelize';

class User extends Model {
    public readonly id!: number; 
    public user_email!: string;
    public user_password!: string;
    public user_name?: string;
    public user_github?: string;
    public user_introduction?: string;
    public user_photo?: string;
}

User.init({
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_github: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_introduction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_photo: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {

};

export default User;