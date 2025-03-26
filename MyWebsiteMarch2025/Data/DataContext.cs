using System;
using Microsoft.EntityFrameworkCore;
using MyWebsiteMarch2025.Entities;

namespace MyWebsiteMarch2025.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<BlogPost> BlogPost { get; set; }
    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlogPost>()
            .HasMany(b => b.Photos)
            .WithOne(p => p.BlogPost)
            .HasForeignKey(p => p.BlogPostId)
            .OnDelete(DeleteBehavior.Cascade); 
    }
}
