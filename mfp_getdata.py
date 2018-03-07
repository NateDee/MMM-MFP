from __future__ import print_function
from jsobject import Object
import sys, json
import myfitnesspal
import datetime

user = sys.argv[1]
passwd = sys.argv[2]

now = datetime.datetime.now()
client = myfitnesspal.Client(user, passwd)
current_stats = client.get_date(now.year, now.month, now.day)

#data_to_send = []
#fiber sodium carbs cals fat protein
#for key in current_stats.totals:
#	data_to_send.append(current_stats.totals[key])

jso_data = Object(current_stats.totals)

print(jso_data)
