import dotenv from "dotenv"
//Load variables from .env
dotenv.config()

//Root url of the application
const base: string = "/api"

const application = {
    url: {
        base
    },
    adminRoles: ["Admin", "Editor"],
    userRoles: ["Seller", "Buyer"], 
    env: {
        serverPort: process.env.SERVER_PORT || 3000,
        socketIOPort: process.env.SOCKET_IO_PORT || 3001,
        authSecret: process.env.TOKEN_SECRET_KEY || "jwt_default_key",
        dtabaseUri: process.env.DATABASE_URI || "mongodb://localhost:27017/apartmentSales",
        domainName: process.env.DOMAIN_NAME || "localhost:3000",
        storageLOcation: process.env.STORAGE_LoCATION || "disk",
        storageAccessKeyId: process.env.STORAGE_ACCESS_KEY_ID || "",
        storageSecretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || "",
        storageBucket: process.env.STORAGE_BUCKET || "",
        storageEndpoint: process.env.STORAGE_ENDPOINT || "",
        storageRegion: process.env.STORAGE_REGION || ""
    }
}

export default application