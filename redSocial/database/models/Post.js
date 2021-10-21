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
    
	let configuracionDeLaTabla = {
	    tableName: 'posts', 
	    timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
	    underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
	}
    
       const Movie = sequelize.define(alias, columnas, configuracionDeLaTabla);
    
       return Movie;
    }