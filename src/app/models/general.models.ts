export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationDate: string;
  refreshTokenExpirationDate: string;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface Sample {
  id: string;
  name: string;
  description: string;
  tests: Test[];
}

export interface Test {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface SampleListResult {
  hasNextPage: boolean;
  totalCount: number;
  items: Sample[];
}

export interface SampleRequest {
  name: string;
  description: string;
}

export interface TestListResult {
  hasNextPage: boolean;
  totalCount: number;
  items: Test[];
}

export interface TestRequest {
  sampleId: string;
  name: string;
}