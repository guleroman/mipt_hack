import requests
import json
from pprint import pprint
url = "http://localhost:8080/api/v1/"


# payload = "{\"table\": \"01.COLs.xlsx\",\"filters\": \"{\"ResourceGroupIds\":\"G_OTGRH\"}\"}"
payload = {
    "table":"01.COLs.xlsx",
    "filters":{
        # "DeliveryType":"РЛН",
        "HasSalesBudgetReservation":True
    }
}
headers = {'content-type': 'application/json'}

response = requests.request("POST", url, data=json.dumps(payload), headers=headers)

pprint(response.json())