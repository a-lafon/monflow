const config = {
  spotify: {
    maxSeeds: 5, // seeds are limited to 5 by spotify to get recommandations
    clientId: process.env.SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    stateKey: 'spotify_auth_state',
    adminScope: 'user-read-private user-read-email user-library-read playlist-read-private playlist-modify-public playlist-modify-private',
    scope: 'user-read-private user-read-email user-library-read playlist-read-private playlist-modify-public playlist-modify-private',
    url: 'https://accounts.spotify.com',
    apiUrl: 'https://api.spotify.com/v1',
    redirectUri: process.env.SPOTIFY_REDIRECT_URI || '',
  }
}

export default config;