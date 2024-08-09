using Domain.BookAggregate.Repositories.Requests;
using Domain.BookAggregate;
using System.Linq.Expressions;
using Domain.AuthorAggregate.Ids;
using Domain.GenreAggregate.Ids;
using Domain.LanguageAggregate.Ids;
using Domain.SharedKernel.ValueObjects;

namespace Persistence.Filters;

public class BookFiltersBuilder
{
    public static List<Expression<Func<Book, bool>>> Build(BookFilterRequest request)
    {
        var filters = new List<Expression<Func<Book, bool>>>();

        if (request.Title != null)
        {
            filters.Add(x => ((string)x.Title).Contains(request.Title));
        }

        if (request.MinPrice > 0)
        {
            filters.Add(x => (decimal)x.Price >= request.MinPrice);
        }

        if (request.MaxPrice > 0)
        {
            filters.Add(x => (decimal)x.Price <= request.MaxPrice);
        }

        if (request.AuthorIds != null)
        {
            filters.Add(x =>
            request.AuthorIds.Select(
                x => new AuthorId(x))
            .Contains(x.Author.Id));
        }

        if (request.GenreIds != null)
        {
            filters.Add(x => 
            request.GenreIds.Select(
                x => new GenreId(x))
            .Contains(x.Genre.Id));
        }

        if (request.LanguageIds != null)
        {
            filters.Add(x =>
            request.LanguageIds.Select(
                x => new LanguageId(x))
            .Contains(x.Language.Id));
        }

        return filters;
    }
}
