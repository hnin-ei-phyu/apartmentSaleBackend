import express, { NextFunction } from "express"
import jwt from "jsonwebtoken"
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import Buyer from "../models/buyers"
import Seller from "../models/sellers"
import Admin from "../models/admins"
import AuthedRequest from "../interfaces/authedRequest"
import application from "../constants/application"
import Helper from "../utilities/helper"

class Auth {
     async isAdmin(req: AuthedRequest, res: express.Response, next: NextFunction): Promise<void> {

        //Get token from request
        const token: any = req.query.token || req.headers["x-access-token"]

        if(!token) {
            return HttpResponse.respondError(res,"Auth token is required",StatusCodes.UNAUTHORIZED)
        }
        try {
            let decoded: any = jwt.verify(token,application.env.authSecret) 

            //Find in Admin Collections
            const admin = await Admin.findOne({_id: decoded.id}).lean()
            if(!admin){
                HttpResponse.respondError(res,"You're not admin!",StatusCodes.UNAUTHORIZED)
            } else {
                req.user = admin
                req.user.role = "admin"
                next()
            }
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
     }

     async adminRegister(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username 
        const email: string = req.body.email 
        const phoneNum: number = req.body.phoneNum
        const password: string = Helper.getHashed(req.body.password)
        const role: number = req.body.role 

        try {
            //Check if there's already with required username
            const admin = await Admin.findOne({email}).lean()
            

            if(admin) {

               return HttpResponse.respondError(res,"There's already a user with this email",StatusCodes.CONFLICT)
            }

            await Admin.create({
                username,
                email,
                phoneNum,
                password,
                role
            })
            HttpResponse.respondStatus(res,"Admin created successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

     async adminLogin(req: express.Request, res: express.Response): Promise<void> {
        
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)

        try {
            const admin = await Admin.findOne({
                email,
                password
            }).lean()
             
            if (!admin) {
                return HttpResponse.respondError(res, "Username or password incorrect.", StatusCodes.UNAUTHORIZED)
            }
 
            HttpResponse.respondResult(res, admin)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

     async isBuyer(req: AuthedRequest,res: express.Response, next: NextFunction): Promise<void> {
       
        //Get token from request
        const token: any = req.query.token || req.headers["x-access-token"]

        if(!token) {
            return HttpResponse.respondError(res, "Auth token is required!", StatusCodes.UNAUTHORIZED)
        }
        try {
            let decoded: any = jwt.verify(token,application.env.authSecret)
            //Find in Seller Collections
            const seller = await Buyer.findOne({_id: decoded.id}).lean()
            if(!seller){
                HttpResponse.respondError(res, "You're not buyer",StatusCodes.UNAUTHORIZED)
            } else {
                req.user = seller
                req.user.role = "buyer"
                next()
            }
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }

     async buyerRegister(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)
        const phoneNum: string = req.body.phoneNum
        const nrcNumber: string = req.body.nrcNumber
        const address: string = req.body.address
        const role: number = req.body.role
        const bio: string = req.body.bio
        const rating: boolean = req.body.rating
        const registered: boolean = req.body.registered
        const savedItems: Array<any> = req.body.savedItems
        const expoTokens: Array<any> = req.body.expoTokens
        

        try {
            //Check if there's already with required Username and email
            const buyer = await Buyer.findOne({email}).lean()
            if(buyer){
                 return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
            }
            await Buyer.create({
                username,
                email,
                password,
                phoneNum,
                nrcNumber,
                address,
                role,
                bio,
                rating,
                registered,
                savedItems,
                expoTokens
            })
            HttpResponse.respondStatus(res,"Buyer Created Successfully1")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

     async buyerLogin(req: express.Request, res: express.Response): Promise<void> {
        const email: string  = req.body.email
        const password: string = Helper.getHashed(req.body.password)

        try {
            const buyer = await Buyer.findOne({
                email,
                password
            }).lean()

            if (!buyer) {
                return HttpResponse.respondError(res, "Username or password incorrect.", StatusCodes.UNAUTHORIZED)
            }
 
            HttpResponse.respondResult(res, buyer)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

     async isSeller(req: AuthedRequest,res: express.Response, next: NextFunction): Promise<void> {
       
        //Get token from request
        const token: any = req.query.token || req.headers["x-access-token"]

        if(!token) {
            return HttpResponse.respondError(res, "Auth token is required!", StatusCodes.UNAUTHORIZED)
        }
        try {
            let decoded: any = jwt.verify(token,application.env.authSecret)
            //Find in Seller Collections
            const seller = await Seller.findOne({_id: decoded.id}).lean()
            if(!seller){
                HttpResponse.respondError(res, "You're not seller1",StatusCodes.UNAUTHORIZED)
            } else {
                req.user = seller
                req.user.role = "seller"
                next()
            }
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }

     async sellerLogin(req: express.Request, res: express.Response): Promise<void> {
        const email: string  = req.body.email 
        const password: string = Helper.getHashed(req.body.password)

        try {
            const seller = await Seller.findOne({
                email,
                password
            }).lean()

            if (!seller) {
                return HttpResponse.respondError(res, "Username or password incorrect.", StatusCodes.UNAUTHORIZED)
            }
 
            HttpResponse.respondResult(res, seller)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

}
export default Auth