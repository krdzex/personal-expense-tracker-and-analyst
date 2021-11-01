import User from "../models/user.model";
import validateSignUp from "../validations/registar"
import errorHandler from "../helpers/dbErrorHandler"
import validateNewPassword from "../validations/newPassword"
import _ from "lodash"
import validateNewEdits from "../validations/editProfile"

const createUser = (req, res) => {
    const { errors, isValid } = validateSignUp(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const user = new User(req.body);
    user.save((err, result) => {

        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}


const removeUser = (req, res) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getErrorMessage(err)
            )
        }
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser)
    })
}

const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user)
            return res.status("400").json({
                error: "User not found"
            })
        req.profile = user;
        next();
    })
}


const updatePassword = (req, res) => {

    const { errors } = validateNewPassword(req.body);

    let user = req.profile;
    if (!user.authenticate(req.body.oldPassword)) {
        _.assign(errors, { oldPassword: "Wrong old password" })
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    user = _.extend(user, { password: req.body.newPassword })
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getErrorMessage(err)
            )
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
    })
}


const chackPassword = (req, res) => {
    let user = req.profile;
    if (!user.authenticate(req.body.password)) {
        return res.status("401").json({
            response: false
        })
    }
    return res.status("200").json({
        response: true
    })
}

const getInfo = (req, res) => {
    let user = req.profile;
    return res.status(200).json(user)
}

const updateProfile = (req, res) => {

    const { errors, isValid } = validateNewEdits(req.body);

    let user = req.profile;
    if (!isValid) {
        return res.status(400).json(errors)
    }

    user = _.extend(user, req.body)
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json(
                { nickName: "This nick already exist" }
            )
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
    })
}

export default { createUser, userByID, removeUser, updatePassword, chackPassword, getInfo, updateProfile }