export  interface ISession  {
   user: {
       name:string,
       email:string
   }; 
   groups: string[];
   xc:string;
   expires:  string;
}