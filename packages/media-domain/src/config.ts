export type JwtToken = string;

// export type JwtTokenProvider = (collectionName?: string) => Promise<JwtToken>;
export type JwtTokenProvider = (collectionName?: string) => any;

export type MediaApiConfig = {
  serviceHost: string,
  tokenProvider: JwtTokenProvider
};
