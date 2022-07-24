export interface Repository {
  id: number;
  name: string;
  created_at: string;
  description: string;
  forks: number;
  language: string;
  owner: Owner;
  stargazers_count: number;
  subscribers_count: number;
  updated_at: string;
  watchers: number;
}

export interface Owner {
  html_url: string;
  login: string;
  avatar_url: string;
}