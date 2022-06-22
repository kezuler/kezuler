interface RKakaoAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

export type { RKakaoAccessToken };
