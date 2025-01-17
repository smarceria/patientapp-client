export class ListResponse<T> {
  totalItems!: number;

  totalPages!: number;

  currentPage!: number;

  items: T[] | undefined;
}
