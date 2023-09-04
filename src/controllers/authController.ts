import Buyer from "../models/buyers"
import Seller from "../models/sellers"
import Admin from "../models/admins"
import application from "../constants/application"
import Helper from "../utilities/helper"
import otpGenerator from "otp-generator"
import { number, string } from "joi"
import jwt from "jsonwebtoken"
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import express from "express"
 


class AuthController{

    async adminRegister(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)
        const phoneNum: string = req.body.phoneNum
        
        try {
            //Check if there's already with required Username and email
            const admin = await Buyer.findOne({email}).lean()
            if(admin){
                return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
            }
            const result = await Admin.create({
                username,
                email,
                password,
                phoneNum
            })

                const token = jwt.sign({email: result.email,id: result._id},application.env.authSecret)
                HttpResponse.respondResult(res,result,token)
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
                return HttpResponse.respondError(res, "Username or Password incorrect", StatusCodes.UNAUTHORIZED)
            }
            const token = jwt.sign({email,password},application.env.authSecret)
            HttpResponse.respondResult(res, admin,token)
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
    const registered: boolean = req.body.registered
    const savedItems: Array<any> = req.body.savedItems
    const expoTokens: Array<any> = req.body.expoTokens
    

    try {
        //Check if there's already with required Username and email
        const buyer = await Buyer.findOne({email}).lean()
        if(buyer){
             return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
        }
        const result = await Buyer.create({
            username,
            email,
            password,
            phoneNum,
            nrcNumber,
            address,
            role,
            bio,
            registered,
            savedItems,
            expoTokens
        })

            const token = jwt.sign({email: result.email,id: result._id},application.env.authSecret)
            HttpResponse.respondResult(res,result,token)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async buyerLogin(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string  = req.body.email
        const password: string = Helper.getHashed(req.body.password)
        const nrcNumber: string = req.body.nrcNumber
        //Checking if user already exits
        Buyer.find({email})
            .then((result) => {
                if(result.length){
                   //A user already exists 
                   res.json({
                    status: "Failed",
                    message: "User with the provided email already exists"
                   })
                } else {
                    //Try to create new user 
                    const newBuyer = new Buyer({
                        username,
                        email,
                        password,
                        nrcNumber
                    })
                }
            })
        
    }

    async sellerRegiseter(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password) 
        const phoneNum: string = req.body.phoneNum
        const nrcNumber: string = req.body.nrcNumber
        const address: string = req.body.address
        const role: number = req.body.role
        const bio: string = req.body.bio 
        const registered: boolean = req.body.registered 
        const expoTokens: Array<any> = req.body.expoTokens

        try {
            //Check if there's already with required Username and email
            const seller = await Seller.findOne({email}).lean()
            if(seller){
                 return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
            }
            const result = await Seller.create({
                username,
                email,
                password,
                phoneNum,
                nrcNumber,
                address,
                role,
                bio,
                registered,
                expoTokens
            })
            const token = jwt.sign({email: result.email,id: result._id},application.env.authSecret)
            HttpResponse.respondResult(res,result,token)
        } catch (error) {
            HttpResponse.respondError(res,error)
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

            const token = jwt.sign({email,password},application.env.authSecret)
            HttpResponse.respondResult(res, seller, token)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

}

export default AuthController