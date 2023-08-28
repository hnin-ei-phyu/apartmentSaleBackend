import crypto from "crypto"
import jwt from "jsonwebtoken"
import application from "../constants/application"

class Hepler{
    //get the hashed string from a playload string
    static getHashed(playload: string): string {
        return crypto.createHash("sha1").update(playload).digest("hex")
    }

    //get the jwt token from the playload string
    static getToken(playload: string): string {
        return jwt.sign(playload,application.env.authSecret)
    }

    //get ramdom hash things
    static getRamdonHashedString(bytes: number = 40): string {
        return crypto.randomBytes(bytes).toString("hex")
    }
}

export default Hepler