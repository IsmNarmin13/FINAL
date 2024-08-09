using Domain.AuthorAggregate;
using Domain.BookAggregate;
using Domain.BookAggregate.Ids;
using Domain.BookAggregate.ValueObjects;
using Domain.SharedKernel.Entities;
using Domain.SharedKernel.ValueObjects;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence.Configurations;

internal sealed class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.HasKey(x => x.Id);       

        builder.Property(x => x.Id)
            .HasConversion(
            bookId => bookId.Value,
            value => new BookId(value))
            .IsRequired();

        builder.Property(x => x.Title)
            .HasConversion(
            title => title.Value,
            value => Title.Create(value).Value)
            .HasMaxLength(Title.MaxLength)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasConversion(
            bookDescription => bookDescription.Value,
            value => BookDescription.Create(value).Value)
            .HasMaxLength(BookDescription.BookDescriptionMaxLength)
            .IsRequired();

        builder.Property(x => x.PageCount)
            .HasConversion(
            pageCount => pageCount.Value,
            value => PageCount.Create(value).Value)
            .IsRequired();

        builder.Property(x => x.Price)
            .HasConversion(
            price => price.Value,
            value => Money.Create(value).Value
            );

        builder.Property(x => x.Quantity)
            .HasConversion(
            quantityBook => quantityBook.Value,
            value => QuantityBook.Create(value).Value)
            .IsRequired();

        builder.Property(x => x.SoldUnits)
            .HasConversion(
            soldUnits => soldUnits.Value,
            value => SoldUnits.Create(value).Value)
            .IsRequired();

        //TODO: Change WithOne to WithMany
        builder.HasOne(x => x.Poster)
            .WithOne()
            .HasPrincipalKey<Image>(x => x.Id)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne(x => x.Language)
            .WithMany(x => x.Books)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne(x => x.Genre)
           .WithMany(x => x.Books)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder.HasOne(x => x.Author)
           .WithMany(x => x.Books)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();
    }
}
