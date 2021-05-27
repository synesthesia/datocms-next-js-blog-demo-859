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
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user, account, profile, isNewUser) {
        console.log(account);

        if (account?.accessToken) {
            //token.accessToken = account.accessToken,
            //token.subject = account.id
        }
        return token
    },

    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client 
     */
    async session(session, token) {
        // Add property to session, like an access_token from a provider.
        console.log(token);
        return session
    }
  }


  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
})