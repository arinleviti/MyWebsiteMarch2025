using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MyWebsiteMarch2025.Entities;
[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;

    // Navigation properties
    public int BlogPostId { get; set; }
    [JsonIgnore]  // Prevent circular reference
    public BlogPost BlogPost { get; set; } = null!;
}
