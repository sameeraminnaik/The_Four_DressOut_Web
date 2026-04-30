using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace The_Four_DressOut_Web.Migrations
{
    /// <inheritdoc />
    public partial class RegistrationDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "LoginModels",
                newName: "UserLoginId");

            migrationBuilder.CreateTable(
                name: "RegisterModels",
                columns: table => new
                {
                    UserRegisterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfirmPassword = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisterModels", x => x.UserRegisterId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RegisterModels");

            migrationBuilder.RenameColumn(
                name: "UserLoginId",
                table: "LoginModels",
                newName: "UserId");
        }
    }
}
