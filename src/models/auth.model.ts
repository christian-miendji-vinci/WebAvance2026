import { Request } from "express";
//import { User , ERole } from "./user.model";




export interface TokenPayLoad {
  id: number;
  email : string ;
  role: "user" | "admin";
}

/**
 * Requête Express enrichie par le middleware AuthService.authorize :
 * après ce middleware, req.user contient l'utilisateur authentifié.
 */
export interface AuthenticatedRequest extends Request {
  user?: TokenPayLoad;
}


