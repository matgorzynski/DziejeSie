using Microsoft.EntityFrameworkCore.Migrations;

namespace DziejeSieApp.Migrations
{
    public partial class xda : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dbo.Events_dbo.User_UserId",
                table: "dbo.Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dbo.User",
                table: "dbo.User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dbo.Events",
                table: "dbo.Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dbo.Error",
                table: "dbo.Error");

            migrationBuilder.RenameTable(
                name: "dbo.User",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "dbo.Events",
                newName: "Event");

            migrationBuilder.RenameTable(
                name: "dbo.Error",
                newName: "Error");

            migrationBuilder.RenameIndex(
                name: "IX_dbo.Events_UserId",
                table: "Event",
                newName: "IX_Event_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "IdUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Event",
                table: "Event",
                column: "EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Error",
                table: "Error",
                column: "ErrorCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_User_UserId",
                table: "Event",
                column: "UserId",
                principalTable: "User",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Event_User_UserId",
                table: "Event");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Event",
                table: "Event");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Error",
                table: "Error");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "dbo.User");

            migrationBuilder.RenameTable(
                name: "Event",
                newName: "dbo.Events");

            migrationBuilder.RenameTable(
                name: "Error",
                newName: "dbo.Error");

            migrationBuilder.RenameIndex(
                name: "IX_Event_UserId",
                table: "dbo.Events",
                newName: "IX_dbo.Events_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_dbo.User",
                table: "dbo.User",
                column: "IdUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_dbo.Events",
                table: "dbo.Events",
                column: "EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_dbo.Error",
                table: "dbo.Error",
                column: "ErrorCode");

            migrationBuilder.AddForeignKey(
                name: "FK_dbo.Events_dbo.User_UserId",
                table: "dbo.Events",
                column: "UserId",
                principalTable: "dbo.User",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
