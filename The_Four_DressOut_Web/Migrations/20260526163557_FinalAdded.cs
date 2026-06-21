using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace The_Four_DressOut_Web.Migrations
{
    /// <inheritdoc />
    public partial class FinalAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "OrderItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "CartItems",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "CartItems");
        }
    }
}
