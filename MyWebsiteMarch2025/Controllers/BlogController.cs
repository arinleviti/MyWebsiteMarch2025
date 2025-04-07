using System;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebsiteMarch2025.Data;
using MyWebsiteMarch2025.Data.DTOs;
using MyWebsiteMarch2025.Entities;
using MyWebsiteMarch2025.Extensions;
using MyWebsiteMarch2025.Helpers;
using MyWebsiteMarch2025.Interfaces;

namespace MyWebsiteMarch2025.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BlogController(DataContext context, IPhotoService photoService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetPosts()
    {
        var posts = await context.BlogPost.Include(bp => bp.Photos).ToListAsync();
        if (posts == null) return NotFound();
        return posts;
    }

    [HttpGet("with-pagination")]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetPaginatedPosts([FromQuery] UsersParams usersParams)
    {
        var query = context.BlogPost.Include(bp => bp.Photos).AsQueryable();
        query = query.OrderByDescending(bp => bp.Id);
        var posts = await PagedList<BlogPost>.CreateAsync(query, usersParams.PageNumber, usersParams.PageSize);
        Response.AddPaginationHeader(posts);
        return Ok(posts);
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

        if (post.Photos.Count > 0)
        {
            foreach (var photo in post.Photos)
            {
                try
                {
                    await photoService.DeletePhotoAsync(photo.Url);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to delete photo {photo.Id}: {ex.Message}");
                }
            }
        }

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

    [HttpPost("add-photo/{postId}")]
    public async Task<ActionResult<Photo>> AddPhoto ([FromForm]IFormFile file, int postId)
    {
        var post = await context.BlogPost.FirstOrDefaultAsync(p => p.Id == postId);
        if (post == null) return BadRequest("Cannot find the post");

        var result = await photoService.AddPhotoAsync(file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            BlogPostId = postId
        };

        post.Photos.Add(photo);
        if (await context.SaveChangesAsync() > 0) return Ok(photo);
        return BadRequest("Problem adding photo");

    }

}
