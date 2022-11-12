import json
import time
from datetime import datetime

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def isURL(i):
	if i.startswith("https://"):
		return True;

	if i.startswith("http://"):
		return True;

	return False;

def checkURLWarn(t, i, suffix):
	if (not isURL(i)):
		print(bcolors.WARNING + f" [!] Warning: {bcolors.OKBLUE}{t}{bcolors.WARNING} not contain URL Scheme (https:// or http://)" + suffix + bcolors.ENDC);

def main():
	print(bcolors.HEADER + "=== OpenToday latest change ===" + bcolors.ENDC)

	prevJson = json.load(open("latest.json", 'r'));
	i = parseFromUser(prevJson);
	if (i['exit'] == True):
		print("[Exit] Exit.");
		return

	r = input("Write this data? (Y/n)-> ");
	if (r == "Y" or r == "y"):
		writeData(i)
		print(f"[Exit] {bcolors.OKGREEN}Sucessfully saved!{bcolors.ENDC}")

	else:
		print(f"[Exit] {bcolors.FAIL}Not write.{bcolors.ENDC}");
		

def writeData(i):
	f = open('latest_build', 'w');
	f.write(str(i['build']));
	f.close();


	latestJson = {
		"build":i['build'],
		"name":i['name'],
		"date":i['date'],
		"page_url":i['page_url'],
		"direct_url":i['direct_url'],
		"changelog_url":i['changelog_url']
	};

	f = open('latest.json', 'w');
	f.write(json.dumps(latestJson, ensure_ascii=False));
	f.close();

	print(bcolors.WARNING + "Don't forget to change the changelog" + bcolors.ENDC);

def parseFromUser(prev):
	try:
		build = int(input(f"[Build({prev['build']})] -> "));
	except Exception as e:
		build = -1;

	try:
		name = str(input(f"[Name({prev['name']})] -> "));
	except Exception as e:
		name = "Error";

	try:
		date = input("[Date] (C)urrent -> ");
	except Exception as e:
		date = 0;

	if (date == "c" or date == "C" or date == ""):
		date = round(time.time());
	else:
		try:
			date = int(date);
		except Exception as e:
			date = 0;

	# PageURL
	page_url = input(f"[Page URL] ENTER for current: \'{prev['page_url']}\'\n -> ");
	if (page_url == ""):
		page_url = prev['page_url']

	# DirectURL
	direct_url = input(f"[Direct URL] ENTER for current: \'{prev['direct_url']}\'\n -> ");
	if (direct_url == ""):
		direct_url = prev['direct_url']

	# ChangelogURL
	changelog_url = input(f"[Changelog URL] ENTER for current: \'{prev['changelog_url']}\'\n -> ");
	if (changelog_url == ""):
		changelog_url = prev['changelog_url']


	_c = bcolors.OKGREEN;
	_ce = bcolors.ENDC;
	print("")
	print(_c + "Check:" + _ce)
	print(_c + f" | Build: {build}" + _ce);
	print(_c + f" | Name: \'{name}\'" + _ce)
	print(_c + f" | Date: {date} ({datetime.fromtimestamp(date)})" + _ce)
	print(_c + f" | Page URL: {page_url}" + _ce)
	checkURLWarn("Page", page_url, "\n");

	print(_c + f" | Direct URL: {direct_url}" + _ce)
	checkURLWarn("Direct", direct_url, "\n");

	print(_c + f" | Changelog URL: {changelog_url}" + _ce)
	checkURLWarn("Changelog", changelog_url, "\n");

	i = input("Next? (<ENTER>/Y)-next; (N)-fix; (E)-exit -> ");
	print("")
	if (i == 'e' or i == "E"):
		return {"exit": True};

	if (i == 'n' or i == "N"):
		return parseFromUser(prev);

	return {
		"build": build,
		"name": name,
		"date": date,
		"page_url": page_url,
		"direct_url": direct_url,
		"changelog_url": changelog_url,
		"exit": False
	};



if __name__ == '__main__':
	main()