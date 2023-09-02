import Merchandise from "../models/merchandises"
import Seller from "../models/sellers"
import HttpResponse from "../utilities/httpResponse"
import express from "express"
import { StatusCodes } from "http-status-codes"

class MerchandiseController {
    
    async create(req: express.Request, res: express.Response): Promise<void> {
        const item: string = req.body.item
        const price: number = req.body.price 
        const location: string = req.body.location
        const photo: string = req.body.photo
        const detail: string = req.body.detail 
        const videos: string = req.body.videos
        const isPubliced: boolean = req.body.isPubliced 
        const isSoldout: boolean = req.body.isSoldout 
        const owner = await Seller.findOne().populate("_id")
        .populate("username")
        .populate("phoneNum")

        try {
            let data = await Merchandise.create({
                item,
                price,
                location,
                photo,
                detail,
                videos,
                isPubliced,
                isSoldout,
                owner
            })
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const itemId: string = req.params.id 
        const item: string = req.body.item
        const price: number = req.body.price
        const location: string = req.body.location 
        const photo: string = req.body.photo 
        const detail: string = req.body.detail 
        const videos: string = req.body.videos 
        const isPubliced: boolean = req.body.isPubliced 
        const isSoldout: boolean = req.body.isSoldout 
        
                                

        try {
            const merchandise = await Merchandise.findById(itemId).lean()
            if(!merchandise) {
                return HttpResponse.respondError(res, "Merchandise not found!",StatusCodes.NOT_FOUND)
            }
            await Merchandise.findByIdAndUpdate(itemId,{
                item,
                price,
                location,
                photo,
                detail,
                videos,
                isPubliced,
                isSoldout
            })
            HttpResponse.respondStatus(res,"Merchandise updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const result = await Merchandise.find().lean()
            if(!result){
                return HttpResponse.respondError(res,"Merchandise Not Found",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,result)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request, res: express.Response): Promise<void> {
        const itemId: string = req.params.id 
        try {
            let data = await Merchandise.findById(itemId).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Merchandise Not Found",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const itemId: string = req.params.id
        try {
            let data = await Merchandise.findById(itemId).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Merchandise Not Found!",StatusCodes.NOT_FOUND)
            }
            await Merchandise.findByIdAndDelete(itemId)
            HttpResponse.respondStatus(res,"Merchandise deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.params.sort || -1 

        try {
            const totalCount: number = await Merchandise.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const items: any[] = await Merchandise.find()
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
                    count: items.length
                }
                HttpResponse.respondPagination(res,items,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }
}

export default MerchandiseController