
export interface LoginResponsePayload {
   authenticationToken:string;
   username : string;
   refreshToken:string ;
   expiresAt:string;

   password:string;
}
