import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    id?: string;
    name?: string;
    email?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    id?: string;
    name?: string;
    email?: string;
  }

  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
