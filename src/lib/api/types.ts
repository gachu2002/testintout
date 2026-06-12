export type ApiDataResponse<TData> = {
  data: TData;
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
