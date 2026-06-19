import mongoose from "mongoose";

const dbConnect = async () => {
try {
    const connect = await mongoose.connect(process.env.MONGO_STRING); 
    console.log(`Database Connected: ${connect.connection.host} :: ${connect.connection.name}`)

} catch(error) {
    console.error(`There was an error connecting to Database`,error);
    process.exit(1);
}}; 

export default dbConnect;
