using System.ComponentModel;

namespace Presentation.V1.Books.Models;

public sealed record GetBooksRequest(
    [Required] int PageSize,
    [DefaultValue(typeof(int), "1")] int PageNumber,
    decimal MinPrice,
    decimal MaxPrice,
    string? Title,
    IEnumerable<Guid>? LanguageIds,
    IEnumerable<Guid>? AuthorIds,
    IEnumerable<Guid>? GenreIds
    );
