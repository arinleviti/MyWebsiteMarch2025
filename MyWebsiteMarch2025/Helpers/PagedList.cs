using System;
using Microsoft.EntityFrameworkCore;

namespace MyWebsiteMarch2025.Helpers;

public class PagedList<T> : List<T>
{
    public int CurrentPage { get; private set; }
    public int PageSize { get; private set; }   
    public int TotalCount { get; private set; }
    public int TotalPages { get; private set; }

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        PageSize = pageSize;
        TotalCount = count;

        AddRange(items);
    }
    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        //If pageNumber = 2 and pageSize = 10, it skips (2 - 1) * 10 = 10 items and takes the next 10, effectively getting items 11–20.
        var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}
   
