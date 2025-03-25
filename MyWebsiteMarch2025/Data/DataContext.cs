using System;
using Microsoft.EntityFrameworkCore;
using MyWebsiteMarch2025.Entities;

namespace MyWebsiteMarch2025.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<BlogPost> BlogPost {get; set;}
}
