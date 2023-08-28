import express from "express"
import { StatusCodes , getReasonPhrase } from "http-status-codes"

class HttpResponse{
    static respondStatus(
        res: express.Response,
        message: String,
        status: number = StatusCodes.OK
    ) {
        res.status(status).json({
            message,
            success: true
        })
    }

    static respondResult(
        res: express.Response,
        data: any,
        status: number = StatusCodes.OK
    ) {
        res.status(status).json({
            data,
            success: true
        })
    }

    static respondPagination(
        res: express.Response,
        data: any[],
        pagination: any,
        status: number = StatusCodes.OK
    ) {
        res.status(status).json({
            data,
            pagination,
            success: true
        })
    }

    static respondError(
        res: express.Response,
        error: any = null,
        status: number = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        if(!error) error = getReasonPhrase(status)
        res.status(status).json({
            error,
            success: false
        })
    }
}
export default HttpResponse