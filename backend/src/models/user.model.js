import crypto from "crypto";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true,
        unique: "Email already exists",
    },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
        required: true,
    },
    hashed_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String
})

UserSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
        } catch (err) {
            return ""
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

export default mongoose.model("User", UserSchema);