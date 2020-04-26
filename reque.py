import requests
import json
from pprint import pprint
url = "http://194.67.112.246/api/v1/"



# payload = {
#     "table":"03.Operations.xlsx",
#     "filters":{
#         "Id":"Flexi-0707"
#         # "HasSalesBudgetReservation":False
#     }
# }

payload = {"table":"02.Supply Orders.xlsx","filters":{"DownstreamCustomerOrders":"40372956/3"}}

headers = {'content-type': 'application/json'}

response = requests.request("POST", url, data=json.dumps(payload), headers=headers)

pprint(response.json())