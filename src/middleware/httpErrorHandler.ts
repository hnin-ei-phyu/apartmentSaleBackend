import express from "express"
import { StatusCodes, getReasonPhrase } from "http-status-codes"

function notFoundErrorHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
            code: StatusCodes.NOT_FOUND,
            message: getReasonPhrase(StatusCodes.NOT_FOUND)
        }
    }) 
    
}