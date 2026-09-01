from internetarchive import upload
from mutagen.flac import FLAC
from sys import argv
import os, re

date_regex = re.compile(r'(.*)(/|\\)(\d\d\d\d)\.(\d\d)\.(\d\d)\. (.*)')

id = 'reas7d-' + argv[1]
folder = argv[2]

info = {}
info['date'] = '%s-%s-%s' % date_regex.match(folder).groups()[2:5]
info['id'] = id

for fname in os.listdir(folder):
	if fname.endswith('.flac'):
		file = FLAC(os.path.join(folder, fname))
		info['title'] = file.tags['ALBUM'][0]
		info['artist'] = file.tags['ALBUMARTIST'][0]
		break
print(info)

r = upload(info['id'], folder + '/', verbose=True, metadata={
	'collection': 'opensource_audio',
	'creator': info['artist'],
	'date': info['date'],
	'licenseurl': 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
	'mediatype': 'audio',
	'title': info['title']
	})
print(r)
