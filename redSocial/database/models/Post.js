module.exports = function(sequelize, dataTypes){

	//Definir un alias.
	let alias = 'Post'; //Con este alias sequelize va a identificar internamente al archivo de modelo.
    
	//Describir la configuración de las columnas de la tabla
	let columnas = {
	    id:{
		autoIncrement: true,
		primaryKey: true,
		type: dataTypes.INTEGER,
	    },
	    usuario_id:{
		type: dataTypes.INTEGER,
	    },
	    imagen:{
		type: dataTypes.STRING,
	    },
	    descripcion:{
		type: dataTypes.STRING,
	    },
	    fecha_creacion:{
		type: dataTypes.DATE,
	    }
	}
    
	let conf= {
	    tableName: 'posts', 
	    timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
	    underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
	}
    
       const Post = sequelize.define(alias, columnas, conf);

       Post.associate = function(models){
	       Post.belongsTo(models.Usuario, {
		       as: "usuario",
		       foreignKey: "usuario_id"
	       }),
	       Post.hasMany(models.Comentarios, {
		       as: "comentarios",
		       foreignKey: "posteo_id"
	       })
       }


       return Post;
    }