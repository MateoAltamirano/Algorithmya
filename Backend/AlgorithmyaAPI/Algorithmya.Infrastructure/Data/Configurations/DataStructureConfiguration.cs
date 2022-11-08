using Algorithmya.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Algorithmya.Infrastructure.Data.Configurations
{
    public class DataStructureConfiguration : IEntityTypeConfiguration<DataStructure>
    {
        public void Configure(EntityTypeBuilder<DataStructure> builder)
        {
            builder.ToTable("DataStructure");

            builder.HasKey(e => e.Name)
                    .HasName("DataStructure_pkey");

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(e => e.Description)
                .HasMaxLength(200)
                .HasColumnName("description");
        }
    }
}
