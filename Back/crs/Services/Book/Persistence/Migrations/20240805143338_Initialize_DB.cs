﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations;

/// <inheritdoc />
public partial class Initialize_DB : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Authors",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Pseudonym = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Authors", x => x.Id);
                table.UniqueConstraint("AK_Authors_Pseudonym", x => x.Pseudonym);
            });

        migrationBuilder.CreateTable(
            name: "Genres",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Genres", x => x.Id);
                table.UniqueConstraint("AK_Genres_Name", x => x.Name);
            });

        migrationBuilder.CreateTable(
            name: "Images",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Bucket = table.Column<string>(type: "nvarchar(max)", nullable: false),
                Name = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Images", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Languages",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Code = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Languages", x => x.Id);
                table.UniqueConstraint("AK_Languages_Code", x => x.Code);
            });

        migrationBuilder.CreateTable(
            name: "OutboxMessageConsumers",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_OutboxMessageConsumers", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "OutboxMessages",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                ProcessedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                Error = table.Column<string>(type: "nvarchar(max)", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_OutboxMessages", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Users",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                PasswordSalt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                RefreshToken_Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                RefreshToken_ExpiredTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                EmailConfirmationToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                ResetPasswordToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                IsEmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Users", x => x.Id);
                table.UniqueConstraint("AK_Users_Email", x => x.Email);
            });

        migrationBuilder.CreateTable(
            name: "Books",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                PageCount = table.Column<int>(type: "int", nullable: false),
                Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Quantity = table.Column<int>(type: "int", nullable: false),
                SoldUnits = table.Column<int>(type: "int", nullable: false),
                AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                PosterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                GenreId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Books", x => x.Id);
                table.ForeignKey(
                    name: "FK_Books_Authors_AuthorId",
                    column: x => x.AuthorId,
                    principalTable: "Authors",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_Books_Genres_GenreId",
                    column: x => x.GenreId,
                    principalTable: "Genres",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_Books_Images_PosterId",
                    column: x => x.PosterId,
                    principalTable: "Images",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_Books_Languages_LanguageId",
                    column: x => x.LanguageId,
                    principalTable: "Languages",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Carts",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                ExpirationTime = table.Column<DateTime>(type: "datetime2", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Carts", x => x.Id);
                table.ForeignKey(
                    name: "FK_Carts_Users_UserId",
                    column: x => x.UserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Wishes",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Wishes", x => x.Id);
                table.ForeignKey(
                    name: "FK_Wishes_Users_UserId",
                    column: x => x.UserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "CartItems",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                CartId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                BookId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Quantity = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_CartItems", x => x.Id);
                table.ForeignKey(
                    name: "FK_CartItems_Books_BookId",
                    column: x => x.BookId,
                    principalTable: "Books",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_CartItems_Carts_CartId",
                    column: x => x.CartId,
                    principalTable: "Carts",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "WishItems",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                BookId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                WishId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_WishItems", x => x.Id);
                table.ForeignKey(
                    name: "FK_WishItems_Books_BookId",
                    column: x => x.BookId,
                    principalTable: "Books",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
                table.ForeignKey(
                    name: "FK_WishItems_Wishes_WishId",
                    column: x => x.WishId,
                    principalTable: "Wishes",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Books_AuthorId",
            table: "Books",
            column: "AuthorId");

        migrationBuilder.CreateIndex(
            name: "IX_Books_GenreId",
            table: "Books",
            column: "GenreId");

        migrationBuilder.CreateIndex(
            name: "IX_Books_LanguageId",
            table: "Books",
            column: "LanguageId");

        migrationBuilder.CreateIndex(
            name: "IX_Books_PosterId",
            table: "Books",
            column: "PosterId",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_CartItems_BookId",
            table: "CartItems",
            column: "BookId");

        migrationBuilder.CreateIndex(
            name: "IX_CartItems_CartId",
            table: "CartItems",
            column: "CartId");

        migrationBuilder.CreateIndex(
            name: "IX_Carts_UserId",
            table: "Carts",
            column: "UserId",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_Wishes_UserId",
            table: "Wishes",
            column: "UserId",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_WishItems_BookId",
            table: "WishItems",
            column: "BookId");

        migrationBuilder.CreateIndex(
            name: "IX_WishItems_WishId",
            table: "WishItems",
            column: "WishId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "CartItems");

        migrationBuilder.DropTable(
            name: "OutboxMessageConsumers");

        migrationBuilder.DropTable(
            name: "OutboxMessages");

        migrationBuilder.DropTable(
            name: "WishItems");

        migrationBuilder.DropTable(
            name: "Carts");

        migrationBuilder.DropTable(
            name: "Books");

        migrationBuilder.DropTable(
            name: "Wishes");

        migrationBuilder.DropTable(
            name: "Authors");

        migrationBuilder.DropTable(
            name: "Genres");

        migrationBuilder.DropTable(
            name: "Images");

        migrationBuilder.DropTable(
            name: "Languages");

        migrationBuilder.DropTable(
            name: "Users");
    }
}
