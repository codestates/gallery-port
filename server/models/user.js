module.exports = (sequelize, DataTypes) => {

    return sequelize.define('users',{
        
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
        timestamps: false
    });
}