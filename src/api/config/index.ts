const getEnvVar = (varName: string): string => {
  const v = process.env[varName];
  if (!v) {
    throw new Error(`${varName} env var does not exist`)
  }
  return v;
}

const config = {
  spotify: {
    maxSeeds: 5, // seeds are limited to 5 by spotify to get recommandations
    clientId: getEnvVar('SPOTIFY_CLIENT_ID'),
    clientSecret: getEnvVar('SPOTIFY_CLIENT_SECRET'),
    stateKey: 'spotify_auth_state',
    adminScope: '',
    userScope: 'user-read-private user-read-email user-library-read playlist-read-private playlist-modify-public playlist-modify-private',
    url: 'https://accounts.spotify.com',
    apiUrl: 'https://api.spotify.com/v1',
    redirectUri: getEnvVar('SPOTIFY_REDIRECT_URI'),
    adminAccessToken: '', // dynamic
    adminRefreshToken: getEnvVar('ADMIN_REFRESH_TOKEN'),
  },
  accessTokenKey: 'access_token',
}

export default config;