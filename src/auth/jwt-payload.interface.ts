export interface JwtPayload {
    email: string;
    sub: number;  // The 'sub' field is commonly used to represent the user's ID in the payload
  }
  