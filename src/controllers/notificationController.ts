import Notification from "../models/notifications";
import express from "express"
import HttpResponse from "../utilities/httpResponse";
import { StatusCodes } from "http-status-codes"

class NotificationController{

    async create(req: express.Request, res: express.Response): Promise<void> {
        const title: string = req.body.title 
        const description: string = req.body.description

        try {
            let noti = await Notification.create({
                title,
                description
            })
            HttpResponse.respondResult(res,noti)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request, res: express.Response): Promise<void> {
        const notiId: string = req.params.id 
        try {
            let noti = await Notification.findById(notiId).lean()
            if(!noti) {
                return HttpResponse.respondError(res,"Notification not found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,noti)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    
    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const noti = await Notification.find().lean()
            if(!noti) {
                return HttpResponse.respondError(res,"Notification not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,noti)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }

    async totalCount(req: express.Request,res: express.Response): Promise<void> {
        try {
            let noti = await Notification.count().lean()
            if(!noti) {
                return HttpResponse.respondError(res,"Notification not found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,noti)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const notiId: string = req.params.id 
        try {
            let noti = await Notification.findById(notiId).lean()
            if(!noti) {
                return HttpResponse.respondError(res,"Notification not found!",StatusCodes.NOT_FOUND)
            }
            await Notification.findByIdAndDelete(notiId)
            HttpResponse.respondStatus(res,"Notification deleted successfully!")
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
            const data: Array<Object> = await Notification.find().skip(skip).limit(limit).lean()
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
            const data: Array<Object> = await Notification.find({ text: { $search: text } }).lean()
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.query.sort || -1

        try {
            const totalCount: number = await Notification.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const admins: any[] = await Notification.find()
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
                    count: admins.length
                }
                HttpResponse.respondPagination(res,admins,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
        
    }

}

export default NotificationController