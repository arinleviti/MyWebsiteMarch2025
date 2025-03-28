using System;

namespace MyWebsiteMarch2025.Entities;

public class BlogPost
{
    public int Id { get; set; }
    public DateTime CreationDate {get; set;}
    public required string Title { get; set; }
    public required string Content {get; set;}
    public List<Photo> Photos { get; set; } = [];

}
