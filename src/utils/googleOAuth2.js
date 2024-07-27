import createHttpError from 'http-errors';
// import { OAuth2Client, type LoginTicket } from 'google-auth-library';
import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
// import { readFile } from 'fs/promises';
import { readFile } from 'node:fs/promises';

// import oauthConfig from '../../google-oauth.json';

// import { ENV_VARS, env } from './env.js';
import { env } from './env.js';

export const googleAuthSettingsPath = path.resolve('google-auth.json');

// const googleAuthSettings = JSON.parse(await readFile(googleAuthSettingsPath));
// const clientId = env('GOOGLE_AUTH_CLIENT_ID');
// const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: oauthConfig.web.redirect_uris[0],
});

// const googleOAuthClient = new OAuth2Client({
//   clientId: env(ENV_VARS.GOOGLE_AUTH_CLIENT_ID), я
//   clientSecret: env(ENV_VARS.GOOGLE_AUTH_CLIENT_SECRET),
//   redirectUri: oauthConfig.web.redirect_uris[0],
// });

export const generateAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
