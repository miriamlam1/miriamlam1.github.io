import os
import json

extlist = ["png","jpg","svg"]

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
            new_json['type'] = "image"
        else:
            new_json['type'] = "file"
    return new_json

print(json.dumps(path_to_dict('.')))