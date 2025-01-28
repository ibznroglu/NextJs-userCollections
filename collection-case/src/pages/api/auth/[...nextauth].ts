import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email ve Şifre',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email === 'test@user.com' && credentials?.password === 'password123') {
          return { id: '1', name: 'Test User', email: 'test@user.com' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
