import neocities, os, hashlib, json
from neocities import NeoCities

site_path = os.path.join('..', 'build')
chunk_size = 100

def hash_file(filename):
   h = hashlib.sha1()
   with open(filename,'rb') as file:
       chunk = 0
       while chunk != b'':
           chunk = file.read(1024)
           h.update(chunk)
   return h.hexdigest()

with open('auth.json') as file:
   auth = json.load(file)
os.chdir(site_path)
nc = neocities.NeoCities(auth['nc-user'],auth['nc-pass'])
response = nc.listitems()
file_info = {}
for file in response['files']:
    if not file['is_directory']:
        file_info[file['path']] = file

web_files = set(file_info.keys())
local_files = set()
for path, dirs, files in os.walk('.'):
    for file in files:
        fpath = os.path.join(path, file).replace('\\','/')[2:]
        local_files.add(fpath)

deleted = web_files - local_files
new = local_files - web_files

updated = set()
for file in local_files & web_files:
    if hash_file(file) != file_info[file]['sha1_hash']:
        updated.add(file)

print('to add:')
for file in new:
    print(file)
print('\nto update:')
for file in updated:
    print(file)
print('\nto delete:')
for file in deleted:
    print(file)
print('\n')

upload_query = tuple()
for file in new | updated:
    upload_query += ((file,file),)
if upload_query:
    n = len(upload_query)
    for i in range(0, n, chunk_size):
        print('Sending upload request for files %s-%s of %s...' % (i + 1, min(n, i + 100), n))
        upload_query_chunk = upload_query[i:i+100]
        print(nc.upload(*upload_query_chunk))

delete_query = list(deleted)
if delete_query:
    n = len(delete_query)
    for i in range(0, n, chunk_size):
        print('Sending delete request for files %s-%s of %s...' % (i + 1, min(n, i + 100), n))
        delete_query_chunk = delete_query[i:i+100]
        print(nc.delete(*delete_query_chunk))
