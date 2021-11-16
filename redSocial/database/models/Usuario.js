module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario";
    let columnas = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombreDeUsuario: {
            type: dataTypes.STRING,
        },
        fotoPerfil: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING
        },
        contrasenia: {
            type: dataTypes.STRING
        },
        seguidores: {
            type: dataTypes.INTEGER,
        },
        seguidos: {
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

    //Creo la relacion de muchos a muchos entre Usuarios y usuarios utilizando la tabla intermedia Followers
    usuario.associate = function (models) {
        usuario.hasMany(models.Post, {
                as: "posteos",
                foreignKey: "usuario_id"
            })
        usuario.hasMany(models.Comentarios, {
                as: "comentarios",
                foreignKey: "usuario_id"
        })
        usuario.belongsToMany(models.Usuario, {
            as: "seguido",
            through: "seguidores",
            foreignKey: "seguidor",
            otherKey: "seguido",
            timestamps: false
        })
        usuario.belongsToMany(models.Usuario, {
            as: "seguidor",
            through: "seguidores",
            foreignKey: "seguido",
            otherKey: "seguidor",
            timestamps: false
        })
    }
    return usuario;
}