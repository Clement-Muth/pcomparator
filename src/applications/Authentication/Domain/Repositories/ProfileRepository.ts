export interface AuthRepository {
  signin(username: string, password: string): Promise<{ accessToken: string }>;
}
