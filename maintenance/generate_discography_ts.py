import yaml
import json
import os
import datetime

output_path = '../src/lib/data/discography.ts'

with open('discography.yaml', 'r') as input_file:
    entries = yaml.safe_load(input_file)

last_mod = datetime.datetime.fromtimestamp(os.path.getmtime('discography.yaml'))
last_mod_number = last_mod.year * 10000 + last_mod.month * 100 + last_mod.day

output = '''
import { type Release } from "$lib/common";

export const discography: { lastUpdated: number, entries: Array<Release> } = %s;
''' % json.dumps({
    "lastUpdated": last_mod_number,
    "entries": entries
}, indent=4)

with open(output_path, 'w') as output_file:
    output_file.write(output)
