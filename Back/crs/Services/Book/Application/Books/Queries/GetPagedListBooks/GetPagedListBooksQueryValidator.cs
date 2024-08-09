using Domain.BookAggregate.ValueObjects;

namespace Application.Books.Queries.GetPagedListBooks;

internal sealed class GetPagedListBooksQueryValidator : AbstractValidator<GetPagedListBooksQuery>
{
    public GetPagedListBooksQueryValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThan(0);

        RuleFor(x => x.PageSize)
            .GreaterThan(0)
            .LessThanOrEqualTo(96);

        RuleFor(x => x.MinPrice)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.MaxPrice)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.Title)
            .MaximumLength(Title.MaxLength);

        RuleFor(x => x.GenreIds)
              .Must(BeUnique)
              .WithMessage("Genre IDs must be unique.");

        RuleFor(x => x.AuthorIds)
              .Must(BeUnique)
              .WithMessage("Author IDs must be unique.");

        RuleFor(x => x.LanguageIds)
             .Must(BeUnique)
             .WithMessage("Language IDs must be unique.");
    }

    private bool BeUnique(IEnumerable<Guid>? guids) =>
        guids == null || guids.Distinct().Count() == guids.Count();
}