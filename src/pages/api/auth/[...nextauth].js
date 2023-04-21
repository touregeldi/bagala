import NextAuth from 'next-auth';
import { signOut } from 'next-auth/react';
import GoogleProvider from "next-auth/providers/google"
import { google } from 'googleapis';

const googleAuth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
)

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async signIn({ account, profile, user }) {
           // const isAllowed = profile.email.endsWith('@nu.edu.kz');

           // if (!isAllowed) {
                // user.error = 'Access denied. Please sign in with an @nu.edu.kz email address.';
               // return '/login?error=true'
           // }

            return true;
        }
    },
});
