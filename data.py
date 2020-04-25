import os
import pandas as pd
from os import listdir
from os.path import isfile, join

path = join(os.getcwd(),"testdata")
# print(path)
onlyfiles = []
onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
print(onlyfiles)

all_tables = {}

# t_01 = pd.read_excel(join(path, '01.COLs.xlsx'),nrows=10)
# t_00 = pd.read_excel(join(path, '00.Fields & Master Data.xlsx'),nrows=10)
# t_02 = pd.read_excel(join(path, '02.Supply Orders.xlsx'),nrows=10)
# t_03 = pd.read_excel(join(path, '03.Operations.xlsx'),nrows=10)
# t_04 = pd.read_excel(join(path, '04.ResourceGroupPeriod.xlsx'),nrows=10)
# t_05 = pd.read_excel(join(path, '05.Routrings.xlsx'),nrows=10)
# t_06 = pd.read_excel(join(path, '06.RoutringSteps.xlsx'),nrows=10)

for i in onlyfiles:
    all_tables.update({i:pd.read_excel(join(path, i),index=False)})
    print('ok')

def getFromTable(table,filters):
    try:
        this_table = all_tables[table]
    except:
        return ({"status_code":400,"message":"not correct name for table (example - 01.COLs.xlsx)"})

    if filters is not None:
        keys = list(filters.keys())
        values = list(filters.values())
        for i in range(len(keys)):
            try:
                this_table = this_table[this_table[keys[i]] == values[i]]
            except:
                return ({"status_code":400,"message":f"table:{table} not consist filter-column:{keys[i]}"})

    # all_tables[table].to_dict()
    this_table = this_table.reset_index()
    this_table = this_table[:5]

    mass = []
    dop = mass.append
    dd = this_table.T.to_dict()
    for i in (range(len(dd))):
        dop(dd[i])
    return ({"status_code":200,"message":mass})