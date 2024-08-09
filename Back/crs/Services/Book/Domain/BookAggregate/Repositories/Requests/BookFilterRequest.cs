namespace Domain.BookAggregate.Repositories.Requests;
public sealed record BookFilterRequest(
    decimal MinPrice,
    decimal MaxPrice,
    string? Title,
    IEnumerable<Guid>? LanguageIds,
    IEnumerable<Guid>? AuthorIds,
    IEnumerable<Guid>? GenreIds
    );
