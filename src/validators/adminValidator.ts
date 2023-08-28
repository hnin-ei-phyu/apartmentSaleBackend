import ExpressValidator from "express-validator"
import express from "express"
import { StatusCodes } from "http-status-codes"
import HttpResponse from "../utilities/httpResponse"

class AdminValidator{
S
    static validateCreate(req: express.Request, res: express.Response, next: express.NextFunction): void {
        req.checkBody("username", "username should not be empty").notEmpty()
        req.checkBody("email", "email should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").isEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST)
        else next()
    }

    static validateGet(req: express.Request, res: express.Response, next: express.NextFunction): void {
        req.checkParams("id", "id should be mongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST)
        else next()
    }

    static validateDelete(req: express.Request, res: express.Response, next: express.NextFunction): void {
        req.checkParams("id", "id should be mongoId").isMongoId()

        let validationErrors = req.validationErrors()
        if(validationErrors) HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST)
        else next()
    }

    static validateUpdate(req: express.Request, res: express.Response,  next: express.NextFunction): void {
        req.checkParams("id", "id should not be mongoId").isMongoId()
        req.checkBody("username", "username should not be empty").notEmpty()
        req.checkBody("phoneNum", "phoneNum should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST)
        else next()
    }

    static validateLogin(req: express.Request, res: express.Response, next: express.NextFunction): void {
        req.checkBody("username", "username should not be empty").notEmpty()
        req.checkBody("password", "password should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST)
        else next()
    }

    static validateUpdatePassword(req: express.Request, res: express.Response,next: express.NextFunction): void {
        req.checkBody("oldPassword", "oldPassword should not be empty").notEmpty()
        req.checkBody("newPassword", "newPassword should not be empty").notEmpty()

        let validationErrors = req.validationErrors()
        if(validationErrors) HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST)
        else next()
    }
}
export default AdminValidator