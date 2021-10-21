module.exports = function(sequelize, dataTypes){
    let alias = "comentarios";
    let columnas = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        posteo_id:{
            type: dataTypes.INTEGER,
        },
        usuario_id:{
            type: dataTypes.INTEGER,
        },
        texto:{
            type: dataTypes.STRING,
        },
        fecha_creacion:{
            type: dataTypes.DATE,
        },
    }

    let configuracionDeLaTabla = {
        tableName: 'comentarios', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }
    const comentarios = sequelize.define(alias, columnas, configuracionDeLaTabla);
        return comentarios;
}