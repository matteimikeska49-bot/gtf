from PIL import Image

# Open the logo image
img = Image.open('public/images/logo.png')

# Convert to RGBA if not already
img = img.convert("RGBA")

# Get bounding box of non-transparent pixels
bbox = img.getbbox()

# Crop the image
if bbox:
    img_cropped = img.crop(bbox)
else:
    img_cropped = img

# Create a square image with the cropped logo
width, height = img_cropped.size
max_dim = max(width, height)

# Create new square transparent image
square_img = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))

# Paste the cropped image in the center
offset = ((max_dim - width) // 2, (max_dim - height) // 2)
square_img.paste(img_cropped, offset)

# Save as 16x16, 32x32 and ico
square_img.resize((16, 16), Image.Resampling.LANCZOS).save('public/favicon-16x16.png')
square_img.resize((32, 32), Image.Resampling.LANCZOS).save('public/favicon-32x32.png')
square_img.resize((96, 96), Image.Resampling.LANCZOS).save('public/favicon-96x96.png')
square_img.resize((192, 192), Image.Resampling.LANCZOS).save('public/apple-touch-icon.png')
square_img.save('public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("Done!")
