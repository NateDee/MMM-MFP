import sys
import myfitnesspal
import datetime

user = sys.argv[1]
password = sys.argv[2]

now = datetime.datetime.now()
client = myfitnesspal.Client(user, password)
current_stats = client.get_date(now.year, now.month, now.day)

for key in current_stats.totals:
	sys.stdout.write(str(current_stats.totals[key]) + '\n')