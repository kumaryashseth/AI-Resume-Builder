import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, no token" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id, id: decoded.id };
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, message: "Not authorized" });
    }
};