import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(404).json({
            success: false,
            Message: "Token Not Found!"
        });
    }
    console.log("token", token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Access!"
            })
        }
        console.log("decoded", decoded);
        req.userId = decoded.userID;
        next();

    } catch (error) {
        console.error("There must be an Error Verifying token ", error);
        throw new Error(`There was an Error, ${error}`);
    }
}
