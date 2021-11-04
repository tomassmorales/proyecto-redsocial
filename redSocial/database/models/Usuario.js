module.exports = function(sequelize, dataTypes){
    let alias = "Usuario";
    let columnas = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombreDeUsuario:{
            type: dataTypes.STRING,
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
        fechaNacimiento: {
            type: dataTypes.DATE
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
        
    }

    let config = {
        tableName: 'usuarios', 
        timestamps: true, //Si la tabla no tiene los campos created_at y updated_at
        underscored: false, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }
        const usuario = sequelize.define(alias, columnas, config);

        return usuario;
}