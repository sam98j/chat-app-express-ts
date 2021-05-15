import mongoose from 'mongoose';
// create User Schema
const UserSchema = new mongoose.Schema({
    _id: String,
    username: String,
    password: String
})
// 
const UsersModel: mongoose.Model<any> = mongoose.model('users', UserSchema);
// export model
export default UsersModel