# Image Replacement Guide

This guide shows you where to add your images for the Bess Brothers Construction website.

## AI Image Generation Prompts

You can use these prompts with AI image generators like DALL-E, Midjourney, or Stable Diffusion to create professional images for your website.

## Required Images

### 1. Service Cards (Homepage)
Located in the services section of the homepage:

- **Windows Service Image**
  - Filename: `windows-service.jpg`
  - Location: `/images/windows-service.jpg`
  - Recommended size: 400x250px
  - Shows: Modern windows, preferably installed in a home
  - **AI Prompt**: "Modern white vinyl windows on suburban home, professional installation, bright sunny day, blue sky, photorealistic architectural photography"

- **Doors Service Image**
  - Filename: `doors-service.jpg`
  - Location: `/images/doors-service.jpg`
  - Recommended size: 400x250px
  - Shows: Beautiful entry door or patio doors
  - **AI Prompt**: "Elegant fiberglass entry door with glass sidelights, upscale home entrance, warm welcoming lighting, photorealistic professional photography"

### 2. Service Detail Pages
Located on the services.html page:

- **Windows Showcase**
  - Filename: `windows-showcase.jpg`
  - Location: `/images/windows-showcase.jpg`
  - Recommended size: 600x400px
  - Shows: High-quality window installation or variety of window styles
  - **AI Prompt**: "Modern living room with variety of window styles, double-hung casement picture windows, bright sunlight, photorealistic interior photography"

- **Doors Showcase**
  - Filename: `doors-showcase.jpg`
  - Location: `/images/doors-showcase.jpg`
  - Recommended size: 600x400px
  - Shows: Premium door installation or door styles
  - **AI Prompt**: "Showcase of residential doors - entry French patio sliding glass, modern home, high-end materials, bright lighting, photorealistic photography"
### 3. Gallery Images
For the gallery page before/after comparisons:

- **Windows Before/After** (multiple sets)
  - Filenames: `window-before-1.jpg`, `window-after-1.jpg`, etc.
  - Location: `/images/`
  - Recommended size: 800x600px
  - Shows: Same angle before and after window replacement
  - **AI Prompt (Before)**: "Old worn windows needing replacement, aluminum frames, condensation between panes, peeling paint, overcast day, photorealistic"
  - **AI Prompt (After)**: "Same home with new white vinyl windows, energy-efficient glass, professional installation, sunny day, photorealistic architectural photo"

- **Doors Before/After** (multiple sets)
  - Filenames: `door-before-1.jpg`, `door-after-1.jpg`, etc.
  - Location: `/images/`
  - Recommended size: 800x600px
  - Shows: Same angle before and after door replacement
  - **AI Prompt (Before)**: "Old worn wooden entry door, outdated hardware, faded paint, suburban home entrance, cloudy day, photorealistic documentary style"
  - **AI Prompt (After)**: "Same entrance with new fiberglass door, decorative glass, modern hardware, sidelights, sunny day, photorealistic architectural photo"

### 4. About Page Images
- **Founders Photo**
  - Filename: `founders.jpg`
  - Location: `/images/founders.jpg`
  - Recommended size: 600x400px
  - Shows: The Bess Brothers
  - **AI Prompt**: "Two professional men in polo shirts, brothers, standing by home with new windows, friendly smiles, natural lighting, photorealistic business photo"

- **Team Member Photos** (optional)
  - Can replace the placeholder icons with actual photos
  - **AI Prompt Template**: "Professional headshot [role] construction company, business casual, friendly expression, clean background, photorealistic portrait"

## How to Add Images

1. **Add your image files** to the `/images/` directory
2. **Use the exact filenames** listed above
3. **Remove the placeholder class** by adding `has-image` class to the container

### Example:
To activate an image after adding it, change:
```html
<div class="service-image">
```
To:
```html
<div class="service-image has-image">
```

## Image Optimization Tips

1. **File Format**: Use JPEG for photos, PNG for images with transparency
2. **Compression**: Optimize images for web (aim for under 200KB per image)
3. **Dimensions**: Follow recommended sizes for best display
4. **Quality**: Use high-quality images that represent your work well

## AI Image Generation Tips

### Best Practices:
1. **Add these to any prompt for better results**:
   - "photorealistic" - For realistic photos
   - "professional photography" - For high-quality look
   - "high resolution, 4k" - For crisp images
   - "commercial photography style" - For business-appropriate images

2. **Avoid common issues**:
   - Add "no text, no watermarks" to prevent unwanted text
   - Specify "daytime, good lighting" for consistency
   - Include "suburban residential setting" for appropriate context

3. **Platform-Specific Tips**:
   - **DALL-E 3**: Use detailed descriptions, great for architectural accuracy
   - **Midjourney**: Add "--ar 16:10" for landscape images, "--ar 3:2" for wider shots
   - **Stable Diffusion**: Use "highly detailed" and specify camera type like "shot with Canon 5D"

### Example Enhanced Prompt:
```
"Modern white vinyl windows on beautiful home, energy-efficient glass, sunny day, blue sky, manicured lawn, photorealistic commercial photography, high resolution, no text"
```
(179 characters - well under the 280 limit)

## Placeholder Styling

The current placeholders show:
- A diagonal stripe pattern background
- The image name
- The expected filename
- Recommended dimensions (where applicable)

These placeholders will automatically disappear when you add the `has-image` class to the container after uploading your images.
