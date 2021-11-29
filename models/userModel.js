import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    isAdmin: {
      type: Boolean,
      //required: true,
      default: false,
    },

    batch :{
      type: String,
      required: false,
    },

    dob: {
        type: Date,
        //required: true,
      },
    father_name: {
      type: String,
      //required: true,
    },
    mother_name: {
      type: String,
      //required: true,
    },
    contact_no: {
      type: String,
      //required: true,
    },
    address: {
        type: String,
        //required: true,
    },
    class: {
        type: String,
        //required: false,
    },

    isTeacher: {
        type: Boolean,
        //required: true,
        default: false,        
      },
      
    subjects:{
      type: Array,
    }
  },
  
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if(err) {
          return cb(err)
      }
      cb(null, isMatch)
  })
}

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')){
    next()
  }
  
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User