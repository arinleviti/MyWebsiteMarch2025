using System;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebsiteMarch2025.Data;
using MyWebsiteMarch2025.Data.DTOs;
using MyWebsiteMarch2025.Entities;

namespace MyWebsiteMarch2025.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BlogController(DataContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetPosts()
    {
        var posts = await context.BlogPost.Include(bp => bp.Photos).ToListAsync();
        if (posts == null) return NotFound();
        return posts;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BlogPost>> GetPostById(int id)
    {

        var post = await context.BlogPost
        .Include(bp => bp.Photos)
        .FirstOrDefaultAsync(bp => bp.Id == id);
        if (post != null)
        {
            return post;
        }
        return NotFound();
    }

    [HttpPost("post")]
    public async Task<ActionResult> PostBlog([FromBody] BlogPost post)
    {
        // Save the BlogPost
        context.BlogPost.Add(post);
        await context.SaveChangesAsync();

        return Ok(post); // Return the created BlogPost (including Id)
    }

    [HttpPost("photos/{blogPostId}")]
    public async Task<ActionResult> PostPhotos(int blogPostId, [FromBody] List<PhotoDto> photoDtos)
    {
        // Check if the BlogPost exists
        var blogPost = await context.BlogPost.FindAsync(blogPostId);
        if (blogPost == null)
        {
            return NotFound("Blog post not found.");
        }

        // Validate the received photos (can be empty, but should be a valid list)
        if (photoDtos == null || photoDtos.Count == 0)
        {
            return BadRequest("No photos provided.");
        }

        // Create Photo objects and associate them with the BlogPost
        var photos = new List<Photo>();
        foreach (var photoDto in photoDtos)
        {
            // Create a Photo object from the DTO and set BlogPostId
            var photo = new Photo
            {
                Url = photoDto.Url,
                BlogPostId = blogPostId // Set the BlogPostId server-side
            };

            // Add the photo to the list and the context
            photos.Add(photo);
            context.Photos.Add(photo);
        }

        // Save the photos to the database
        await context.SaveChangesAsync();

        return Ok(photos); // Return the photos that were added
    }

    [HttpDelete("delete-post/{postId}")]
    public async Task<ActionResult> DeletePost(int postId)
    {
        var post = await context.BlogPost.FirstOrDefaultAsync(x => x.Id == postId);
        if (post == null) return NotFound("This post id doesnt't exist");

        context.BlogPost.Remove(post);
        // Save changes to the database
        try
        {
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Optional: Log the exception or handle specific errors
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
        return Ok("post deleted succesfully");
    }

}
