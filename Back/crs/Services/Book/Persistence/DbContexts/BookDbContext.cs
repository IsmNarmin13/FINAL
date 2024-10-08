﻿using Domain.AuthorAggregate;
using Domain.BookAggregate;
using Domain.CartAggregate;
using Domain.CartAggregate.Entities;
using Domain.Core.Events.Interfaces;
using Domain.Core.Messages.OutboxMessages;
using Domain.GenreAggregate;
using Domain.LanguageAggregate;
using Domain.SharedKernel.Entities;
using Domain.UserAggregate;
using Domain.WishAggregate;
using Domain.WishAggregate.Entities;

namespace Persistence.DbContexts;

public class BookDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<WishItem> WishItems { get; set; }
    public DbSet<Wish> Wishes { get; set; }
    public DbSet<Image> Images { get; set; }

    public DbSet<OutboxMessage> OutboxMessages { get; set; }
    public DbSet<OutboxMessageConsumer> OutboxMessageConsumers { get; set; }

    // if you need migration in Persistence layer.
    public BookDbContext()
    {
    }

    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) =>
        modelBuilder
        .Ignore<IList<IDomainEvent>>()
        .ApplyConfigurationsFromAssembly(AssemblyReference.Assembly);

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => 
        optionsBuilder.UseSqlServer();
}
