import { MongoClient, ServerApiVersion } from "mongodb";
const uri =process.env.MONGODB_URI;
const dbName = process.env.DBNAME;
console.log(process.env.MONGODB_URI)
export const collections = {
  USERS:"users",
  SERVICE:"service",
  SERVICELOCATION:"serviceLocation",
  BOOKINGSERVICES:"bookingServices",
  BOOKINGSERVICESFORADMIN:"bookingServicesForAdmin",
  USERREVIEWS:"userReviews",
  USERFEEDBACK:"userFeedback",

}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnection = (collectionName) => {
    return client.db(dbName).collection(collectionName)
}