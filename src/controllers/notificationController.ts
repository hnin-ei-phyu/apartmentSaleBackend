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

    async getNotiWithLimit(req: express.Request, res: express.Response): Promise<void> {
        const skip: number = req.body.skip
        const limit: number = req.body.limit 

        try {
            let noti = await Notification.find().skip(skip).limit(limit).lean()
            if(!noti) {
                return HttpResponse.respondError(res,"Notificatin not found!",StatusCodes.NOT_FOUND)
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
}

export default NotificationController