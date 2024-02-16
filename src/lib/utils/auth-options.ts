import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prismadb from '@/lib/prismaDb';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@gmail.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				if (!credentials) return null;

				const { email, password } = credentials;
				if (!email || !password) return null;

				const user = await prismadb.user.findFirst({
					where: {
						email,
					},
				});
				if (!user) return null;

				const passwordCorrect = await compare(password, user.password);
				if (!passwordCorrect) return null;

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					userId: user.id,
				};
			}

			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					userId: token.userId,
				},
			};
		},
	},
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === 'development',
};
