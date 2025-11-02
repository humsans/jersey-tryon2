
export type JerseyType = 'Home' | 'Away' | 'Third';

export interface Team {
  id: string;
  name: string;
  logo: string;
  jerseys: {
    [key in JerseyType]: string;
  };
}
