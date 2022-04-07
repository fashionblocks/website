export class Pagination<T> {
  static empty<T>() {
    return new Pagination<T>(0, 0, []);
  }

  constructor(
    public readonly page: number,
    public readonly total: number,
    public readonly data: T[],
  ) {}

  get noMore(): boolean {
    return this.data.length >= this.total;
  }

  merge(paging: Pagination<T>): Pagination<T> {
    if (this.page + 1 === paging.page) {
      return (new Pagination(paging.page, paging.total, this.data.concat(paging.data)));
    } else {
      return this;
    }
  }
}

export interface PaginationJSON<T> {
  total: number;
  data: T[];
}
