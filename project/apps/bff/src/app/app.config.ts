export enum ApplicationServiceURL {
  Users = 'http://localhost:3003/api/auth',
  Tasks = 'http://localhost:3000/api/tasks',
  Comments = 'http://localhost:3004/api/comments',
  Reviews = 'http://localhost:3000/api/reviews',
  Categories = 'http://localhost:3000/api/categories',

}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
