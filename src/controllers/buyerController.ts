import Buyer from "../models/buyers"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../types/AuthedRequest"
import Otp from "../models/otps"
import application from "../constants/application"
import otpGenerator from "otp-generator"
import jwt from "jsonwebtoken"
import _ from "underscore"

class BuyerController{

    async buyerRegister(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)
        const comfirmedPassword: string = Helper.getHashed(req.body.comfirmedPassword)
        const phoneNumber: string = req.body.phoneNumber
        

        try {
            //Check if there's already with required Username and email
            const buyer = await Buyer.findOne({email}).lean()
            if(buyer){
                return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
            }

            if(password === comfirmedPassword) {
                const result = await Buyer.create({
                    username,
                    email,
                    password,
                    comfirmedPassword,
                    phoneNumber
                })

                const token = jwt.sign({email: result.email,id: result._id},application.env.authSecret)
                return HttpResponse.respondResult(res,result,token)     
            }

            
            HttpResponse.respondError(res,"Your Password and Comfirmed Password are not matched!")
            } catch (error) {
                HttpResponse.respondError(res,error)
        }
    }

    async buyerLogin(req: express.Request, res: express.Response): Promise<void> {
        
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)

        try {
            const admin = await Buyer.findOne({
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

    async totalCount(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Buyer.count().lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,admin)
         } catch (error) {
             HttpResponse.respondError(res,error)
         } 
    }

    async getWithRange(req: express.Request, res: express.Response): Promise<void> {
        if(!req.query.skip || !req.query.limit) {
            return HttpResponse.respondError(res,"skip and limit is required at query",StatusCodes.BAD_REQUEST)
        }

        const skip: number = parseInt(req.query.toString())
        const limit: number = parseInt(req.query.toString())

        try {
            const data: Array<Object> = await Buyer.find().skip(skip).limit(limit).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,data)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }

    async search(req: express.Request, res: express.Response) {
        let text: string | undefined = req.query.text?.toString()

        try {
            const data: Array<Object> = await Buyer.find({ text: { $search: text } }).lean()
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }



    async get(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 

        try {
            const buyer = await Buyer.findById(buyerId).lean()
            if(!buyer){
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,buyer)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 

        try {
            const buyer = await Buyer.findById(buyerId)
            if(!buyer) {
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
            }
            await Buyer.findByIdAndDelete(buyerId)
            HttpResponse.respondResult(res,"Buyer Deleted Successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Buyer.find().lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,admin)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 
        const username: string = req.body.username
        const phoneNumber: string = req.body.phoneNumber
        const nrcNumber: string = req.body.nrcNumber
        const address: string = req.body.address
        const bio: string = req.body.bio
        const rating: number = req.body.rating 
    
         try {
            const buyer = await Buyer.findById(buyerId).lean()
            if(!buyer){
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
            }
            await Buyer.findByIdAndUpdate(buyerId,{
                username,
                phoneNumber,
                nrcNumber,
                address,
                bio,
                rating
            })
            HttpResponse.respondStatus(res,"Buyer Updated Successfully!")
         } catch (error) {
            HttpResponse.respondError(res,error)
         }
    }

     async updatePassword(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 
        const oldPassword: string = Helper.getHashed(req.body.oldPassword)
        const newPassword: string = Helper.getHashed(req.body.newPassword)

        try {
            const buyer = await Buyer.findById(buyerId).lean()
            if(!buyer) {
                return HttpResponse.respondError(res,"Buyer not Found",StatusCodes.NOT_FOUND)
            }
            if(buyer.password != oldPassword){
                return HttpResponse.respondError(res,"Password not match",StatusCodes.BAD_REQUEST)
            }
            await Buyer.findByIdAndUpdate(buyerId,{
                password: newPassword
            })
            HttpResponse.respondStatus(res,"New password updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

     async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.query.sort || -1

        try {
            const totalCount: number = await Buyer.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const buyers: any[] = await Buyer.find()
                .sort({
                    createdAt: sort
                })
                .skip(skip)
                .limit(perPage)
                .lean()

                const pagination = {
                    lastPage: totalPages,perPage,
                    currentPage: page,
                    total: totalCount,
                    count: buyers.length
                }
                HttpResponse.respondPagination(res,buyers,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
        
    }
    
     async verify(req: AuthedRequest, res: express.Response): Promise<void> {
        HttpResponse.respondResult(res, req.user)
    }
}
export default BuyerController