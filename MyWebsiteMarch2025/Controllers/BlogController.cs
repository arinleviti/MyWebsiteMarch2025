using System;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebsiteMarch2025.Data;
using MyWebsiteMarch2025.Entities;

namespace MyWebsiteMarch2025.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BlogController(DataContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetPosts()
    {
        var posts = await context.BlogPost.ToListAsync();
        if (posts == null) return NotFound();
        return posts;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BlogPost>> GetPostById(int id)
    {
        var post = await context.BlogPost.FindAsync(id);
        if ( post != null)
        {
           return post;
        }
        return NotFound();
    }

    [HttpPost("post")]
    public async Task<ActionResult> PostBlog(BlogPost post)
    {
        if (post == null) 
        {
            Console.Error.WriteLine("Error: Blog post is null.");
            return BadRequest();
        }
        context.BlogPost.Add(post);
        await context.SaveChangesAsync();
        return Ok();
    }

}
