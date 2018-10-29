using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DziejeSieApp.Migrations
{
    public partial class xd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dbo.Error",
                columns: table => new
                {
                    ErrorCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(nullable: false),
                    Desc = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dbo.Error", x => x.ErrorCode);
                });

            migrationBuilder.CreateTable(
                name: "dbo.User",
                columns: table => new
                {
                    IdUser = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Login = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    RegisterFullDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dbo.User", x => x.IdUser);
                });

            migrationBuilder.CreateTable(
                name: "dbo.Events",
                columns: table => new
                {
                    EventId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: false),
                    Postcode = table.Column<string>(nullable: false),
                    Town = table.Column<string>(nullable: false),
                    EventDate = table.Column<DateTime>(nullable: false),
                    AddDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dbo.Events", x => x.EventId);
                    table.ForeignKey(
                        name: "FK_dbo.Events_dbo.User_UserId",
                        column: x => x.UserId,
                        principalTable: "dbo.User",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dbo.Events_UserId",
                table: "dbo.Events",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dbo.Error");

            migrationBuilder.DropTable(
                name: "dbo.Events");

            migrationBuilder.DropTable(
                name: "dbo.User");
        }
    }
}
