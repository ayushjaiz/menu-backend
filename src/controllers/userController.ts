// import { Request, Response } from "express";
// import { getUserById } from "../models/UserModel";

// export const getAdminDashboard = async(req: Request, res: Response) => {
//     const adminId = req.user?.id;

//     if (!adminId) {
//         res.status(400).json({ message: "Invalid token, user ID missing" });
//         return;
//     }

//     try {
//         // Fetch the user details from the database
//         const moderator = await getUserById(adminId)

//         if (!moderator) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         // Send back the full details of the user
//         res.status(200).json({
//             message: "User Profile",
//             moderator,
//         });
//         return;

//     } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//         return;
//     }
// };

// export const getModeratorDashboard = async(req: Request, res: Response) => {
//     const moderatorId = req.user?.id;

//     if (!moderatorId) {
//         res.status(400).json({ message: "Invalid token, user ID missing" });
//         return;
//     }

//     try {
//         // Fetch the user details from the database
//         const admin = await getUserById(moderatorId)

//         if (!admin) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         // Send back the full details of the user
//         res.status(200).json({
//             message: "User Profile",
//             admin,
//         });
//         return;

//     } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//         return;
//     }
// };

// export const getUserProfile = async (req: Request, res: Response) => {
//     const userId = req.user?.id;

//     if (!userId) {
//         res.status(400).json({ message: "Invalid token, user ID missing" });
//         return;
//     }

//     try {
//         // Fetch the user details from the database
//         const user = await getUserById(userId)

//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         // Send back the full details of the user
//         res.status(200).json({
//             message: "User Profile",
//             user,
//         });
//         return;

//     } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//         return;
//     }
// };
