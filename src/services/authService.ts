import { createUser, getUserByEmail } from "../models/UserModel";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

// Register a new user
export const registerUser = async (email: string, password: string, role?: string) => {
    const hashedPassword = await hashPassword(password);
    return await createUser(email, hashedPassword, role);
};

// Find user by email
export const findUserByEmail = async (email: string) => {
    return await getUserByEmail(email);
};

// Login user
export const loginUser = async (email: string, passwordInput: string) => {
    const user = await findUserByEmail(email);
    if (!user || !(await comparePassword(passwordInput, user.password))) {
        throw new Error("Invalid credentials");
    }

    // Destructure to remove password
    const { password, ...userWithoutPassword } = user;

    // Generate a JWT token
    const token = generateToken({ id: user.id, role: user.role });

    // Return token and user without password
    return { token, user: userWithoutPassword };
};
