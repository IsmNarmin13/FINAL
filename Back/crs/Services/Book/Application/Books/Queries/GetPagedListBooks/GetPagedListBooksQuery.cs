using Application.Common.DTOs.Books;
using Contracts.Paginations;

namespace Application.Books.Queries.GetPagedListBooks;

public sealed record GetPagedListBooksQuery(
    int PageNumber,
    int PageSize,
    decimal MinPrice,
    decimal MaxPrice,
    string? Title,
    IEnumerable<Guid>? LanguageIds,
    IEnumerable<Guid>? AuthorIds,
    IEnumerable<Guid>? GenreIds
    ) : IQuery<PagedList<BookDto>>;
