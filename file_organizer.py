import os
import json
from PIL import Image
from pathlib import Path

sorting_types = ["interface","branding","typography","other"]

#from https://note.nkmk.me/en/python-pillow-image-crop-trimming/
#crops image to its center
def crop_center(pil_img, crop_width, crop_height):
    img_width, img_height = pil_img.size
    return pil_img.crop(((img_width - crop_width) // 2,
        (img_height - crop_height) // 2,
        (img_width + crop_width) // 2,
        (img_height + crop_height) // 2))

#from https://note.nkmk.me/en/python-pillow-image-crop-trimming/
#crops the max square possible frm center
def crop_max_square(pil_img):
    return crop_center(pil_img, min(pil_img.size), min(pil_img.size))

#compress the image for website
def image_compress(path):
    foo = Image.open(path)
    foo = crop_max_square(foo)
    foo = foo.resize((800,800),Image.ANTIALIAS)
    index = (path.rfind('.'))
    path = path[:index] + "_cover_" + path[index:]
    foo.save(path,quality=98,optimize=True)

def path_to_dict(path):
    new_json = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        new_json['type'] = "directory"
        children_list = []
        for x in os.listdir(path):
            children_list.append(path_to_dict(os.path.join(path,x)))
        new_json['children'] = children_list
    else:
        if new_json["name"].endswith(".jpg") or new_json["name"].endswith(".png"):
            if "_cover_" not in path: 
                image_compress(path)
            new_json['type'] = "image"
        else:
            new_json['type'] = "file"
    return new_json
#path_to_dict('.')
print(json.dumps(path_to_dict('.')))