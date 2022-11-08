using Algorithmya.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

#nullable disable

namespace Algorithmya.Infrastructure.Data
{
    public partial class AlgorithmyaContext : DbContext
    {
        public AlgorithmyaContext()
        {
        }

        public AlgorithmyaContext(DbContextOptions<AlgorithmyaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<DataStructure> DataStructures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
