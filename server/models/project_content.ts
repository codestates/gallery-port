import {Model, DataTypes} from 'sequelize';
import {dbType} from './index';
import {sequelize} from './sequelize';

class ProjectContent extends Model {
    public readonly id!: number; 
    public content_text!: string;
    public content_image!: string;
}

ProjectContent.init({
    content_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content_image: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'ProjectContent',
    tableName: 'project_content',
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

export const associate = (db: dbType) => {

};

export default ProjectContent;