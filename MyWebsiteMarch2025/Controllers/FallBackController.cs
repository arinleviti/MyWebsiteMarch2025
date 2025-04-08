using System;
using Microsoft.AspNetCore.Mvc;

namespace MyWebsiteMarch2025.Controllers;

public class FallBackController : Controller
{
    public ActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "Text/HTML");
    }

    
}
