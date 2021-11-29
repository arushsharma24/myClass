import mongoose from 'mongoose'


const subjectSchema = mongoose.Schema(
  {
    subject_name: {
      type: String,
      required: true,
    },
    subject_class: {
        type: Array,  // !FIXME use something else here (and in the other places, instead of array.)
        required: true,
      },
    // instead of primary, secondary, etc, use a data structure to store any variable number of teachers instead of hardcoding.
    teacherPrimary: {
        type: Array,
        required: true,
    },
    teacherSecondary:{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    teacherTertiary:{
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }

  },
  {
    timestamps: true,
  }
)


const Subject = mongoose.model('Subject', subjectSchema)

export default Subject