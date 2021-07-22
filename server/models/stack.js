module.exports = (sequelize, DataTypes) => {

    return sequelize.define('stacks',{
        
        stack_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        timestamp: false
    });
}