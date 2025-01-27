export interface IRetweetersResponse {
  tweetId: string; // The ID of the tweet
  users: Array<{
    id: string;
    name: string;
    username: string;
  }>;
  meta: {
    resultCount: number;
    nextToken: string;
  };
}
