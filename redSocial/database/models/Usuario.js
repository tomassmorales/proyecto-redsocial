module.exports = function(sequelize, dataTypes){
    let alias = "usuario";
    let columnas = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombreDeUsuario:{
            type: dataTypes.INTEGER,
        },
        email:{
            type: dataTypes.STRING
        },
        contraseña:{
            type: dataTypes.STRING
        },
        seguidores:{
            type: dataTypes.INTEGER,
        },
        seguidos:{
            type: dataTypes.INTEGER,
        },
        
    }

    let config = {
        tableName: 'usuario', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }
        const usuario = sequelize.define(alias, columnas, config);

        return usuario;
}