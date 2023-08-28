import Buyer from "../models/buyers"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../interfaces/authedRequest"

class BuyerController{
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

    async create(req: express.Request, res: express.Response): Promise<void> {
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
        const phoneNum: string = req.body.phoneNum
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
                phoneNum,
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