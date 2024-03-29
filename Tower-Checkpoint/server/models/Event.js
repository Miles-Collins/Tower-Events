import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema ({
  creatorId: { type: ObjectId, required: true, ref:'Account'},
  name: {type: String, required: true,},
  description: {type: String, required: true, },
  coverImg: { type: String, required: true,},
  location: { type: String, required: true,},
  capacity: { type: Number, min: 0},
  startDate: { type: Date, required: true},
  isCanceled: {type: Boolean, required: true, default: false},
  type: {type: String, enum: ['convention', 'sport', 'digital', 'concert', 'food', 'travel', 'health'], required: true, lowercase: true, default: 'concert'},
}, {
  timestamps: true, toJSON: {virtuals: true}
})

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})