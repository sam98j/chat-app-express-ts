import mongoose from 'mongoose';
import { User } from '../interfaces/users.service';
// create User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    socket_id: String,
    online: Boolean,
    last_seen: String
})
// 
const UsersModel: mongoose.Model<User> = mongoose.model('users', UserSchema);
// export model
export default UsersModel