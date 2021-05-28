import tiny from 'tiny-json-http';

export interface UserProfile {
    id?: string,
    firstname?: string
    email?:string
    roles?:string[]
    error?:string;
}


export async function getProfile( id:string ) {

    // later we'll add real endpoint that queries CRM
  
    /*
    const { body } = await tiny.post({
      url: endpoint,
      headers: {
        authorization: `Bearer ${process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN}`,
      },
      data: {
        query,
        variables,
      },
    });
  
    if (body.errors) {
      console.error("Ouch! The query has some errors!");
      throw body.errors;
    }*/

    let data =  {
        id: id,
        roles: ["test1", "test2"]

    } as UserProfile;
   
    console.log(`userprofile backend (faked) returns ${JSON.stringify(data)}`);

    return data;
  }

