import type { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {

    let requestHeaders = req.headers;
    let contentType = requestHeaders['content-type'];

    if (contentType == 'undefined' || contentType != "application/json"){
        res.status(400).json({error: "Must set Content-Type: application/json"});
        return;
    }
    let values = req.body;

    // this code runs server-side so can safely process secrets
    // so at this point we could send our form response 
    // to a database or other external processing
    // for this mockup we just echo the submitted values after a delay
    await new Promise(resolve => {
        setTimeout(() => {
        res.status(200).json(values);
        res.end();
      }, 500);  
    });
}