import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    //Providers.GitHub({
    //  clientId: process.env.GITHUB_ID,
    //  clientSecret: process.env.GITHUB_SECRET
    //}),
    
    Providers.IdentityServer4({
        id: "idsrv",
        name: "SSAT Login",
        scope: "openid profile email userprofile ssat offline_access", // Allowed Scopes
        domain:  process.env.IdentityServer_Domain,
        clientId: process.env.IdentityServer_CLIENT_ID,
        clientSecret: process.env.IdentityServer_CLIENT_SECRET
      }),
      

    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
})