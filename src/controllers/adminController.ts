import Admin from "../models/admins"
import express, { NextFunction } from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../interfaces/authedRequest"
import application from "../constants/application"
import jwt from "jsonwebtoken"
import _ from "underscore"


class AdminController{

    async adminRegister(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)
        const phoneNum: string = req.body.phoneNum
        
        try {
            //Check if there's already with required Username and email
            const admin = await Admin.findOne({email}).lean()
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

    async totalCount(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Admin.count().lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,admin)
             console.log(typeof(admin))
         } catch (error) {
             HttpResponse.respondError(res,error)
         } 
    }

    async getWithRange(req: express.Request, res: express.Response): Promise<void> {
        if(!req.query.skip || !req.query.limit) {
            return HttpResponse.respondError(res,"skip and limit is required at query",StatusCodes.BAD_REQUEST)
        }

        const skip: number = parseInt(req.query.skip.toString())
        const limit: number = parseInt(req.query.limit.toString())

        try {
            const data: Array<Object> = await Admin.find().skip(skip).limit(limit).lean()
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
            const data: Array<Object> = await Admin.find({ text: { $search: text } }).lean()
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
     async get(req: express.Request,res: express.Response): Promise<void> {
        const adminId: string = req.params.id

        try {
            const admin = await Admin.findById(adminId).lean()
            if(!admin) {
               return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,admin)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }

    }

     async delete(req: express.Request, res: express.Response): Promise<void> {
        const adminId: string = req.params.id 

        try {
            const admin = await Admin.findById(adminId)
            if(!admin) {
               return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
            }
            await Admin.findByIdAndDelete(adminId)
            HttpResponse.respondResult(res,"Admin deleted Successfully !")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Admin.find().lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,admin)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }

     async update(req: express.Request, res: express.Response): Promise<void> {
        const adminId: string = req.params.id

        const username: string = req.body.username
        const phoneNum: string = req.body.phoneNum

        try {
            const admin = await Admin.findById(adminId).lean()

            if (!admin) {
                return HttpResponse.respondError(res, "Admin not found", StatusCodes.NOT_FOUND)
            }

            await Admin.findByIdAndUpdate(adminId, {
                username,
                phoneNum,
            })

            HttpResponse.respondStatus(res, "Admin updated successfully.")
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

     async updatePassword(req: express.Request, res: express.Response): Promise<void> {
        const adminId: String = req.params.id
        const oldPassword: String = Helper.getHashed(req.body.oldPassword)
        const newPassword: String = Helper.getHashed(req.body.newPassword)

        try {
            const admin = await Admin.findById(adminId).lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Admin not Found",StatusCodes.NOT_FOUND)
            }
            if(admin.password != oldPassword){
                return HttpResponse.respondError(res,"Password not match",StatusCodes.BAD_REQUEST)
            }
            await Admin.findByIdAndUpdate(adminId,{
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
            const totalCount: number = await Admin.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const admins: any[] = await Admin.find()
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
    
     async verify(req: AuthedRequest, res: express.Response): Promise<void> {
        HttpResponse.respondResult(res, req.user)
    }
}
export default AdminController



