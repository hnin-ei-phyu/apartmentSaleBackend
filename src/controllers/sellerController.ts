import Seller from "../models/sellers"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../interfaces/authedRequest"

class SellerController{
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