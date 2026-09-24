import jwt from "jsonwebtoken" ;
import { TokenPayLoad } from "../models/auth.model";
/**
 * "Fake token" : un simple encodage Base64 de l'email de l'utilisateur.
 *
 * C'est le même mécanisme que dans le projet Web 1. Il permet d'identifier
 * l'utilisateur à chaque requête, mais n'importe qui peut fabriquer un token
 * valide en encodant un email... Il sera remplacé par un vrai mécanisme
 * d'authentification (JWT) dans la suite du cours.
 */

export const generateFakeToken = (email: string): string => {
  return Buffer.from(email, "utf-8").toString("base64");
};

export const validateFakeToken = (token: string): string => {
  return Buffer.from(token, "base64").toString("utf-8");
};

const SECRET_KEY = process.env.JWT_SECRET ! ;

 export function generateToken(user : TokenPayLoad) : string {
  return jwt.sign(
    user,
    SECRET_KEY,
    {
      expiresIn: "1d" ,
      algorithm: "HS256" ,
    }
  );
}

/**const token = generateToken({
   id :1,
   email: "john@gmail.com",
   role: "user", 
}) ;

console.log(token);*/



