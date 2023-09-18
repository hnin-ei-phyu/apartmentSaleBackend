import Seller from "../models/sellers"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../interfaces/authedRequest"
import Otp from "../models/otps"
import application from "../constants/application"
import otpGenerator from "otp-generator"
import jwt from "jsonwebtoken"
import _ from "underscore"
 

class SellerController{

    async sellerLogin(req: express.Request, res: express.Response): Promise<void> {
        const seller = await Seller.findOne({
            phoneNumber: req.body.phoneNumber
        })
        if(seller)  return HttpResponse.respondError(res,"Seller already registered!",StatusCodes.CONFLICT);
        const OTP = otpGenerator.generate(6,{
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false,specialChars: false
        });
        
        console.log(OTP)

        const phoneNumber = req.body.phoneNumber

        const otp = new Otp({ phoneNumber: phoneNumber, otp: OTP});
        const result = await otp.save();
        return HttpResponse.respondStatus(res,"Otp send successfully!")
    }

    async verifySellerOtpAndCreate(req: express.Request, res: express.Response): Promise<void> {
            
        const otpHolder = await Otp.find({
            phoneNumber: req.body.phoneNumber
        })

            
        if(otpHolder.length === 0) return HttpResponse.respondError(res,"You use an Expired OTP!",StatusCodes.UNAUTHORIZED)

            const rightOtpFind = otpHolder[otpHolder.length-1]
            const otp: string = req.body.otp
            
            if(otp === rightOtpFind.otp) {
                true
            }

        if(rightOtpFind.phoneNumber === req.body.phoneNumber && true) {
        const seller = new Seller({
            phoneNumber: req.body.phoneNumber,
            username: req.body.username,
            email: req.body.email,  
            password: req.body.password,
            nrcNumber: req.body.nrcNumber,
            address: req.body.address,
            role:  req.body.role,
            bio:  req.body.bio,
            registered: req.body.registered,
            savedItems: req.body.savedItems,
            expoTokens: req.body.expoTokens
        })
            const token = jwt.sign({},application.env.authSecret)
            const result = await seller.save()
            const OTPDelete = await Otp.deleteMany({
                phoneNumber: rightOtpFind.phoneNumber
            })
            return HttpResponse.respondResult(res,result,token)
        } else {
            HttpResponse.respondError(res,"Your OTP was wrong")
        }
    }

    async totalCount(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Seller.count().lean()
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
            const data: Array<Object> = await Seller.find().skip(skip).limit(limit).lean()
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
            const data: Array<Object> = await Seller.find({ text: { $search: text } }).lean()
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }



    async get(req: express.Request, res: express.Response): Promise<void> {
        const sellerId: string = req.params.id 

        try {
            const seller = await Seller.findById(sellerId).lean()
            if(!seller){
                return HttpResponse.respondError(res,"Seller not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,seller)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const sellerId: string = req.params.id 

        try {
            const seller = await Seller.findById(sellerId)
            if(!seller) {
                return HttpResponse.respondError(res,"Seller not Found!",StatusCodes.NOT_FOUND)
            }
            await Seller.findByIdAndDelete(sellerId)
            HttpResponse.respondResult(res,"Seller Deleted Successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const seller = await Seller.find().lean()
            if(!seller) {
                return HttpResponse.respondError(res,"Seller not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,seller)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }


    async update(req: express.Request, res: express.Response): Promise<void> {
        const sellerId: string = req.params.id 
        const username: string = req.body.username
        const phoneNum: string = req.body.phoneNum
        const nrcNumber: string = req.body.nrcNumber
        const address: string = req.body.address
        const bio: string = req.body.bio 
        const rating: string = req.body.rating 
        
         try {
            const seller = await Seller.findById(sellerId).lean()
            if(!seller){
                return HttpResponse.respondError(res,"Seller not Found!",StatusCodes.NOT_FOUND)
            }
            await Seller.findByIdAndUpdate(sellerId,{
                username,
                phoneNum,
                nrcNumber,
                address,
                bio,
                rating
            })
            HttpResponse.respondStatus(res,"Seller Updated Successfully!")
         } catch (error) {
            HttpResponse.respondError(res,error)
         }
    }

   
    async updatePassword(req: express.Request, res: express.Response): Promise<void> {
        const sellerId: string = req.params.id 
        const oldPassword: string = Helper.getHashed(req.body.oldPassword)
        const newPassword: string =  Helper.getHashed(req.body.newPassword)

        try {
            const seller = await Seller.findById(sellerId).lean()
            if(!seller) {
                return HttpResponse.respondError(res,"Seller not Found",StatusCodes.NOT_FOUND)
            }
            if(seller.password != oldPassword){
                return HttpResponse.respondError(res,"Password not match",StatusCodes.BAD_REQUEST)
            }
            await Seller.findByIdAndUpdate(sellerId,{
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
            const totalCount: number = await Seller.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const sellers: any[] = await Seller.find()
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
                    count: sellers.length
                }
                HttpResponse.respondPagination(res,sellers,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
        
    }
    
     async verify(req: AuthedRequest, res: express.Response): Promise<void> {
        HttpResponse.respondResult(res, req.user)
    }
}
export default SellerController