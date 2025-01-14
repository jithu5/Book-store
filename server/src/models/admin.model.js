import mongoose
 from "mongoose";
 import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";

 const AdminSchema = new mongoose.Schema({
     username: {
         type: String,
         required: true,
         unique: true,
     },
     password: {
         type: String,
         required: true,
     },
     email: {
         type: String,
         required: true,
         unique: true,
     },
 }
,{timestamps: true}
)

AdminSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);

    }
    next();
})

AdminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

AdminSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};


const AdminModel = new mongoose.model("Admin",AdminSchema);

export default AdminModel;