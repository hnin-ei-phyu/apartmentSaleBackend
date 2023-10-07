import Seller from "../models/sellers"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../types/AuthedRequest"
import Otp from "../models/otps"
import application from "../constants/application"
// import otpGenerator from "otp-generator"
import jwt from "jsonwebtoken"
import _ from "underscore"
 

class SellerController{

    async sellerRegister(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)
        const comfirmedPassword: string = Helper.getHashed(req.body.comfirmedPassword)
        const phoneNumber: string = req.body.phoneNumber
        
        try {
            //Check if there's already with required Username and email
            const seller = await Seller.findOne({email}).lean()
            if(seller){
                return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
            }

            if(password === comfirmedPassword) {
                const result = await Seller.create({
                    username,
                    email,
                    password,
                    comfirmedPassword,
                    phoneNumber
                })

                const token = jwt.sign({email: result.email,id: result._id},application.env.authSecret)
                return HttpResponse.respondResult(res,result,token)
            }
            
            HttpResponse.respondError(res,"Your password and comfirmed are not matched!")
                
            } catch (error) {
                HttpResponse.respondError(res,error)
        }
    }

    async sellerLogin(req: express.Request, res: express.Response): Promise<void> {
        
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)

        try {
            const admin = await Seller.findOne({
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

<<<<<<< HEAD
    // async verifyOtpAndLogin(req: express.Request, res: express.Response): Promise<void> {
            
    //     const otpHolder = await Otp.find({
    //         phoneNumber: req.body.phoneNumber
    //     })

            
    //     if(otpHolder.length === 0) return HttpResponse.respondError(res,"You use an Expired OTP!",StatusCodes.UNAUTHORIZED)

    //         const rightOtpFind = otpHolder[otpHolder.length-1]
    //         const otp: string = req.body.otp
            
    //         if(otp === rightOtpFind.otp) {
    //             true
    //         }

    //     if(rightOtpFind.phoneNumber === req.body.phoneNumber && true) {
    //         const seller = await Seller.findOne({phoneNumber: req.body.phoneNumber})
    //         const token = jwt.sign({},application.env.authSecret)
    //         const OTPDelete = await Otp.deleteMany({
    //             phoneNumber: rightOtpFind.phoneNumber
    //         })
    //         return HttpResponse.respondResult(res,seller,token)
    //     } else {
    //         HttpResponse.respondError(res,"Your OTP was wrong")
    //     }
    // }
=======
    async verifyOtpAndLogin(req: express.Request, res: express.Response): Promise<void> {
            
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
            const seller = await Seller.findOne({phoneNumber: req.body.phoneNumber})
            const token = jwt.sign({},application.env.authSecret)
            const OTPDelete = await Otp.deleteMany({
                phoneNumber: rightOtpFind.phoneNumber
            })
            return HttpResponse.respondResult(res,seller,token)
        } else {
            HttpResponse.respondError(res,"Your OTP was wrong")
        }
    }
>>>>>>> 0cf641ce3db137f6b708e2b49b7793e8f7f79408

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