import requests
import json
from pprint import pprint
url = "http://194.67.112.246/api/v1/"



payload = {
    "table":"03.Operations.xlsx",
    "filters":{
        "Id":"Flexi-0707"
        # "HasSalesBudgetReservation":False
    }
}

# payload = {
#     "group":"G_ANGC3H",
# }

headers = {'content-type': 'application/json'}

response = requests.request("POST", url, data=json.dumps(payload), headers=headers)

pprint(response.json())