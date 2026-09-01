from PIL import Image
import os, shutil


def resize_image_with_borders(input_path, output_path, target_size):
    """
    Resize an image to a given size while preserving aspect ratio,
    adding black borders if necessary.

    :param input_path: Path to the input image.
    :param output_path: Path to save the resized image.
    :param target_size: Tuple (width, height) for the target size.
    """
    with Image.open(input_path) as img:
        # Calculate the aspect ratio
        img.thumbnail(target_size)

        # Create a new image with a black background
        new_image = Image.new("RGB", target_size, (0, 0, 0))

        # Calculate position to paste the resized image
        paste_x = (target_size[0] - img.width) // 2
        paste_y = (target_size[1] - img.height) // 2

        # Paste the resized image onto the new image
        new_image.paste(img, (paste_x, paste_y))

        # Save the new image
        new_image.save(output_path)

os.chdir(os.path.join("..", "src", "lib", "assets"))
for f in sorted(os.listdir("covers_big")):
    if os.path.exists(os.path.join("covers_small", f[:-4] + ".jpg")):
        continue
    print(f)
    resize_image_with_borders(
        os.path.join("covers_big", f),
        os.path.join("covers_small", f[:-4] + ".jpg"),
        (400, 400)
    )