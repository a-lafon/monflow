import config from "@/config";
import axios from "axios";

interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

class SpotifyAuthClient {
  public async requestAccessToken(code: string): Promise<AccessToken> {
    const { data } = await axios({
      method: 'post',
      url: `${config.spotify.url}/api/token`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        code,
        redirect_uri: config.spotify.redirectUri,
        grant_type: 'authorization_code',
      },
    });

    return data;
  }

  public async refreshAccessToken(refreshToken: string): Promise<AccessToken> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', config.spotify.clientId);

    const headers = {
      Authorization: `Basic ${Buffer.from(`${config.spotify.clientId}:${config.spotify.clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const { data } = await axios.post(`${config.spotify.url}/api/token`, params, { headers });
    
    return data;
  }
}

const spotifyAuthClient = new SpotifyAuthClient();

export default spotifyAuthClient;