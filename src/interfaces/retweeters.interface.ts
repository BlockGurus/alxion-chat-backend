export interface IRetweetersResponse {
  tweetId: string; // The ID of the tweet
  data: Array<{
    id: string;
    name: string;
    username: string;
  }>;
  meta: {
    resultCount: number;
    nextToken: string;
  };
}
