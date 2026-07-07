export type ApiDataResponse<TData> = {
  data: TData;
};

export type CursorParams = {
  cursor: string;
  limit: number;
  q?: string;
  sort?: string;
};

export type PageInfo = {
  cursor: string | null;
  hasNext: boolean;
  nextCursor: string | null;
  total: number;
};

export type PaginatedResponse<TItem> = {
  items: TItem[];
  page: PageInfo;
};

export function unwrapApiData<TData>(response: { data: ApiDataResponse<TData> }) {
  return response.data.data;
}
