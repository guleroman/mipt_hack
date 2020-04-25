import requests
import json
from pprint import pprint
url = "http://194.67.112.246/api/v1/"


# payload = "{\"table\": \"01.COLs.xlsx\",\"filters\": \"{\"ResourceGroupIds\":\"G_OTGRH\"}\"}"
payload = {
    "table":"02.Supply Orders.xlsx",
    "filters":{
        # "DeliveryType":"РЛН",
        # "HasSalesBudgetReservation":False
    }
}
headers = {'content-type': 'application/json'}

response = requests.request("POST", url, data=json.dumps(payload), headers=headers)

pprint(response.json())