export interface BlogPost {
    id?: number;
    title?: string;
    content?: string;
    photoUrl?: Photo[]; 
  }

  export interface Photo {
    id: number;
    url: string;
    blogPostId: number;
  }