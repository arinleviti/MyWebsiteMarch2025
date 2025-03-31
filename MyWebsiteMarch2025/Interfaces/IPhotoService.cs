using System;
using CloudinaryDotNet.Actions;

namespace MyWebsiteMarch2025.Interfaces;

public interface IPhotoService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}
