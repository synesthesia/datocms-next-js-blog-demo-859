import jwt from 'next-auth/jwt'
import { getSession } from 'next-auth/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserProfile, getProfile } from '../../lib/userprofile';


export default async (req: NextApiRequest, res: NextApiResponse<UserProfile>) => {

    const secret = process.env.JWTSECRET;
    const token = await jwt.getToken({ req, secret })
    //const session = await getSession({ req })
    if (token) {
      console.log('JSON Web Token', JSON.stringify(token, null, 2))
      // sub property of JWT contains user id
      if ((token.sub)) {
        let response =  await getProfile(token.sub);
        console.log(`/api/user returns ${response}`);
        res.status(200).json(response);  
      } else {
        res.status(401).json({error: "No sub claim in token"});    
      }
    } else {
      res.status(401).json({error: "Not signed in"});
    }
    res.end()

}