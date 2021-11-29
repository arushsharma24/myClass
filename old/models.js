//import sequelize 
const Sequelize=require('sequelize');
//make connection to database with username and passsword and specify which db we are using like 'mysql','mongodb' etc
const db=new Sequelize('database_name','username','password',{ 
    host:'localhost',
    dialect:'mysql'
})



// modals 
const MyModel = sequelize.define('MyModel', {
    myArrayField: { 
        type: Sequelize.DataTypes.UUID, 
        get: function() {
            return JSON.parse(this.getDataValue('myArrayField'));
        }, 
        set: function(val) {
            return this.setDataValue('myArrayField', JSON.stringify(val));
        }
    }
})

const School=db.define('school',{
    school_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    //1. use array and class models to store list of class ids

})

const Classroom=db.define('classroom',{ 
    classrrom_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    //2. use user model for storing author user id
    auhtor: {
        type: Sequelize.UUID,
        // references: {
        //     model: User,
        //     auhtor_id: 'user_id',
        // },
        
    },
    //3. use user model and array model for creating array of user ids
    // studnets: {
    //     type: Sequelize.
    // },
    subj: {
        type: Sequelize.STRING,
    },
    grade: {
        type: Sequelize.STRING,
    },
    // 4. check - using school id from school model
    school: {
        type: Sequelize.UUID,
        references: {
            model: School,
            school_id,
        },
    },
    //5. use array model to store pdf files
    tasks: {

    }
})

const User = db.define('user', {
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    grade: {
        type: Sequelize.STRING,
    },
    dob: {
        type: Sequelize.DATE,
    },
    father_name: {
        type: Sequelize.STRING,
    },
    mother_name: {
        type: Sequelize.STRING,
    },
    contact_no: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    // 6. list of class ids to which user belongs to
})