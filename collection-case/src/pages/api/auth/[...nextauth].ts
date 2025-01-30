import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email ve Şifre',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post('https://maestro-api-dev.secil.biz/Auth/Login', {
            username: credentials?.email,
            password: credentials?.password,
          }, {
            headers: {
              'Authorization': 'YOUR_SECRET_TOKEN',
              'Content-Type': 'application/json',
            }
          });

          if (response.status === 200 && response.data?.data?.accessToken) {
            return {
              id: response.data.data.id,
              name: response.data.data.name,
              email: credentials?.email,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken, 
            };
          }
        } catch (error) {
          console.error('Authentication failed:', error);
          return null;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        token.id = user.id ?? undefined;
        token.name = user.name ?? undefined;
        token.email = user.email ?? undefined;
        token.accessToken = user.accessToken ?? undefined;
        token.refreshToken = user.refreshToken ?? undefined;
        token.accessTokenExpires = Date.now() + 3600 * 1000; 
      }
  
      
      if (typeof token.accessTokenExpires === 'number' && Date.now() > token.accessTokenExpires) {
        try {
          const response = await axios.post('https://maestro-api-dev.secil.biz/Auth/RefreshTokenLogin', {
            refreshToken: token.refreshToken,
          }, {
            headers: {
              'Authorization': 'YOUR_SECRET_TOKEN',
              'Content-Type': 'application/json',
            }
          });
  
          if (response.status === 200 && response.data?.data?.accessToken) {
            token.accessToken = response.data.data.accessToken;
            token.refreshToken = response.data.data.refreshToken;
            token.accessTokenExpires = Date.now() + response.data.data.expiresIn * 1000;
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }
  
      return token;
    },
    async session({ session, token }) {
      
      session.id = typeof token.id === 'string' ? token.id : undefined;
      session.name = typeof token.name === 'string' ? token.name : undefined;
      session.email = typeof token.email === 'string' ? token.email : undefined;
      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
      session.refreshToken = typeof token.refreshToken === 'string' ? token.refreshToken : undefined;
  
      return session;
    },
  },  
  
  secret: process.env.JWT_SECRET,
});
