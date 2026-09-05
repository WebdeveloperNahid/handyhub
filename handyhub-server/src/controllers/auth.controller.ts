import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async getMe(req: Request, res: Response) {
    try {
      if (!req.user?._id) {
        return res.status(401).json({ message: "unauthorized access" });
      }
      const user = await AuthService.getCurrentUser(req.user._id);
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching user profile", error });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];
      if (token) {
        await AuthService.deleteSession(token);
      }
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error during logout", error });
    }
  }
}
