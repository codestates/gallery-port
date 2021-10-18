import {Model, DataTypes} from 'sequelize';
import {dbType} from './index';
import {sequelize} from './sequelize';

class Project extends Model {
    public readonly id!: number; 
    public project_name!: string;
    public project_thumbnail!: string;
    public project_introduction?: string;
    public project_url?: string;
    public project_github?: string;
    public project_front_stack?: string;
    public project_back_stack?: string;
    public project_deploy_stack?: string;
    public project_team?: string;
    public project_start?: Date;
    public project_end?: Date;
}

Project.init({
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_introduction: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_feature: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_github: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_front_stack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_back_stack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_deploy_stack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_team: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    project_thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    project_start: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    project_end: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {

};

export default Project;