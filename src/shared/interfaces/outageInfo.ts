interface PostItem {
  title: string;
  date: Date;
  content: string;
}

export interface OutageInfo {
  title: string;
  posts: PostItem[];
  affected_on: string;
  severity: string;
}
