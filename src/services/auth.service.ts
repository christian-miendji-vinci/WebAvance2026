import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../models/auth.model";
import { ERole, User } from "../models/user.model";
import { generateFakeToken, validateFakeToken } from "../utils/auth";
import { LoggerService } from "./logger.service";
import { UsersService } from "./users.service";
import { verifyToken } from "../utils/gestionJwt";

export class AuthService {
  /**
   * Vérifie les identifiants.
   * @returns un token si l'email et le mot de passe sont corrects, undefined sinon
   */
  static login(email: string, password: string): string | undefined {
    const user = UsersService.getByEmail(email);
    if (!user) return undefined;
    if (user.password !== password) return undefined;

    return generateFakeToken(user.email);
  }

  /**
   * Middleware : vérifie le token du header Authorization et place l'utilisateur dans req.user.
   * Répond 401 si le token est absent ou invalide.
   */
  static authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization"); // recupère le header dans le token

    if (!token) {
      LoggerService.error("Missing Authorization header");
      return res.sendStatus(401);
    }

    const payload = verifyToken(token) ;
    if(!payload) return res.sendStatus(401) ;

    /**let user: User | undefined = undefined;
    try {
      const email = validateFakeToken(token);
      user = UsersService.getByEmail(email);
    } catch (error) {
      LoggerService.error(error);
    }

    if (!user) {
      LoggerService.error("Invalid token");
      return res.sendStatus(401);
    }**/

    req.user = payload ; // disponible dans les middlewares et routes suivants
    return next();
  }

  /**
   * Middleware (à placer après authorize) : n'autorise que les administrateurs.
   * Répond 403 sinon.
   */
  static isAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.user) return res.sendStatus(401);
    if (req.user.role !== "admin") return res.sendStatus(403);
    return next();
  }
}
