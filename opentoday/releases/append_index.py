INDEX_FILE = "./index_openfiletable.json"
FOLDER = "./raw"
HREF_PREFIX = "https://fazziclay.github.io/opentoday/releases/raw/";

import os
import json


def main():
	index = json.load(open(INDEX_FILE, "r"))

	for i in os.listdir(FOLDER):
		contain = False;
		for jsonObj in index:
			if jsonObj["name"] == i:
				contain = True;

			if jsonObj["sources"] == i:
				contain = True;

		if (contain == False):
			index.append({
					"build": "00001",
					"version_name": "0.0.0 todo",
					"name": i,
					"href": HREF_PREFIX + i,
					"date": "0000-00-00",
					"description": "TODO: Change description",
					"sources": "owo",
					"sources_href": HREF_PREFIX + "owo"
				});

	open(INDEX_FILE, "w").write(json.dumps(index, indent=4, sort_keys=True, ensure_ascii=False));


if __name__ == '__main__':
	main()