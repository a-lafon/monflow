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
    stateKey: getEnvVar('SPOTIFY_STATE_KEY'),
    adminScopeKey: getEnvVar('SPOTIFY_ADMIN_SCOPE_KEY'),
    adminScope: '',
    userScope: getEnvVar('SPOTIFY_USER_SCOPE'),
    url: getEnvVar('SPOTIFY_URI'),
    apiUrl: getEnvVar('SPOTIFY_API_URI'),
    redirectUri: getEnvVar('SPOTIFY_REDIRECT_URI'),
    adminAccessToken: '', // dynamic
    adminRefreshToken: getEnvVar('SPOTIFY_ADMIN_REFRESH_TOKEN'),
  },
  accessTokenKey: 'access_token',
}

export default config;