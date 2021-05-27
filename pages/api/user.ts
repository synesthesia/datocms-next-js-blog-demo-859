import jwt from 'next-auth/jwt'
import { getSession } from 'next-auth/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserProfile } from '../../lib/userprofile';

export default async (req: NextApiRequest, res: NextApiResponse<UserProfile>) => {


    const secret = process.env.JWTSECRET;

    const token = await jwt.getToken({ req, secret })
    //const session = await getSession({ req })
    if (token) {
      // Signed in
      console.log('JSON Web Token', JSON.stringify(token, null, 2))
      //console.log('Session', JSON.stringify(session, null, 2))
      // sub property of JWT contains user id
      let response =  {
          sub: token.sub,
          roles: ["member", "efa"]

      } as UserProfile;
      console.log(response);
      res.status(200).json(response);

    } else {
      // Not Signed in
      res.status(401).json({error: "Not signed in"});
    }
    res.end()

}