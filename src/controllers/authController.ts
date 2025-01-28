// import { Request, Response } from "express";
// import { registerUser, loginUser } from "../services/authService";
// import { getUserByEmail } from "../models/UserModel";
// import { validateEmail, validatepassword } from "../utils/validator";

// export const register = async (req: Request, res: Response) => {
//   try {
//     const { email, password, role } = req.body;

//     // Check if email or password is missing
//     if (!email || !password) {
//       res.status(400).json({ message: "Email and password are required." });
//       return;
//     }

//     // Email and password validation
//     if (!validateEmail(email) || !validatepassword(password)) {
//       res.status(400).json({ message: 'Enter correct email id and at least 5 characters password' });
//       return;
//     }

//     if (role) {
//       if (!(role == "ADMIN" || role == "MODERATOR" || role == 'USER')) {
//         res.status(400).json({ message: "This role is unsupported." });
//         return;
//       }

//     }

//     // Check if the user already exists
//     const existingUser = await getUserByEmail(email);
//     if (existingUser) {
//       res.status(409).json({ message: "User is already registered." }); // 409 Conflict
//       return;
//     }

//     // Register the user
//     const newUser = await registerUser(email, password, role);

//     // Return the user without password
//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });

//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email or password is missing
//     if (!email || !password) {
//       res.status(400).json({ message: "Email and password are required." });
//       return;
//     }

//     // Check if the user already exists
//     const existingUser = await getUserByEmail(email);
//     if (!existingUser) {
//       res.status(409).json({ message: "User is not registered." }); // 409 Conflict
//       return;
//     }


//     const { token, user } = await loginUser(email, password);
//     res.cookie('token', token, { httpOnly: true, maxAge: 15 * 60 * 1000 });

//     res.status(200).json({ token, user });
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// };

// export const logout = async (req: Request, res: Response) => {
//   res.cookie('token', '', { maxAge: 1 });
//   res.status(200).json({ message: 'Logged out successfully' });
// }
