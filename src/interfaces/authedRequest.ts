import express from "express"

interface AuthedRequest extends express.Request{
    user?: any
}

export default AuthedRequest