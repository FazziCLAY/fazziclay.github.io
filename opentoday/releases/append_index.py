INDEX_FILE = "./index_openfiletable.json"
FOLDER = "./raw"

import os
import json


def main():
	index = json.load(open(INDEX_FILE, "r"))

	for i in os.listdir(FOLDER):
		contain = False;
		for jsonObj in index:
			if jsonObj["name"] == i:
				contain = True;

		if (contain == False):
			index.append({
					"name": i,
					"href": "./" + i,
					"date": "0000-00-00",
					"description": "TODO: Change description"
				});

	open(INDEX_FILE, "w").write(json.dumps(index, indent=4, sort_keys=True, ensure_ascii=False));


if __name__ == '__main__':
	main()