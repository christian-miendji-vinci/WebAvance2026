import { TokenPayLoad } from "../models/auth.model";
import jwt from "jsonwebtoken" ;


const SECRET_KEY = process.env.JWT_SECRET ! ;

 export function verifyToken(token : string) : TokenPayLoad | undefined {
  try {
    const decoded = jwt.verify(token , SECRET_KEY) as TokenPayLoad;
    return decoded ;
  } catch (error) {
    console.error("Token invalide :" , error);
    return undefined ;
  }
}

//Un exemple de payload // --------> ne sert strictement à  rien
/**const token = "eyJhbGc..." ;
const payload = verifyToken(token) ;

if(payload) {
    console.log("Utilisiteur :" , payload.email);
    
} else {
    console.log("Token rejeté");
    
}**/