export interface BlogPost {
    id?: number;
    title?: string;
    content?: string;
    photos?: Photo[]; 
  }

  export interface Photo {
    id: number;
    url: string;
    blogPostId: number;
  }