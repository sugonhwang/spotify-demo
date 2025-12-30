// api 응답 타입 인터페이스

export interface ApiResponse<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}
