import { NextAuth } from 'next-auth';
import { Providers } from 'next-auth/providers';

const options = {
    providers : [
        // Providers.Google({
        //     clientId : "",
        //     clientSecret : "",
        // }),
        
        // Providers.Facebook({
        //     clientId : "",
        //     clientSecret  : "",
        // }),
        // Providers.Github({
        //     clienId : "",
        //     clientSecret : "",
        // }),
        // Providers.Auth0({
        //     clientId : "",
        //     clientSecret :  "",
        //     domain : "",
        // })
    ]
};

export default (req, res) => NextAuth(req, res, options);