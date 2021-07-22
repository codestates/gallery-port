module.exports = (sequelize, DataTypes) => {

    return sequelize.define('project_content',{
        
        content_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content_image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}