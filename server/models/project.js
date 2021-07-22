module.exports = (sequelize, DataTypes) => {

    return sequelize.define('projects',{
        
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
        },
    },{
        timestamp: false
    });
}