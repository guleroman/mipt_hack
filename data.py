import os
import pandas as pd
from os import listdir
from os.path import isfile, join
import json
import re
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
# cesh_proc.xlsx
# group_proc.xlsx

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
                if (keys[i] == "Id") and (table == "03.Operations.xlsx"):
                    this_table = this_table[this_table[keys[i]].str.contains(values[i])]
                    this_table = this_table.sort_values('End')
                else:
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
    return ({"status_code":200,"message":json.dumps(mass,default=str)})

def getProcentsGroup(group):
    try:
        this_table = all_tables['group_proc.xlsx']
        pass
    except:
        return ({"status_code":400,"message":"not find 04.ResourceGroupPeriod.xlsx table"})

    # this_table = this_table[group]
    time = this_table['time']
    procs = this_table[group]
    r_groupe_procent = []
    for i in range(len(this_table)):
        r_groupe_procent.append({time[i]:procs[i]})
    
    return ({"status_code":200,"message":r_groupe_procent})


def getProcents(data):
    try:
        this_table = all_tables['04.ResourceGroupPeriod.xlsx']
        pass
    except:
        return ({"status_code":400,"message":"not find 04.ResourceGroupPeriod.xlsx table"})

    this_table = this_table[this_table['Start'] == data]

    r_groupe_procent = []
    for i in range(len(this_table)):
        strr = this_table.iloc[i]
        proc = get_procents(strr)
        r_groupe_procent.append({"ceh_name":this_table.iloc[i]['Ceh'],"groupe_name":this_table.iloc[i]['ResourceGroupID'],"t_proc":proc})

    new_df = pd.DataFrame(r_groupe_procent)
    mass = []
    names_cehs = list(set(new_df['ceh_name']))
    for name in names_cehs:
      r_groupe = []
      nnd = new_df[new_df['ceh_name'] == name]
      for i in range(len(nnd)):
        r_groupe.append({"g_name":nnd.iloc[i]['groupe_name'],"t_proc":str(nnd.iloc[i]['t_proc'])})
      mass.append({"ceh_name":name,"r_groupe":r_groupe,"t_proc":json.dumps(round(abs(nnd['t_proc'].mean())),default=str)})

    t_proc = round(abs(new_df['t_proc'].mean()))

    
    return ({"status_code":200,"message":{"cehs":mass,"t_proc":json.dumps(t_proc,default=str)}})


def get_procents(strr):
    AvailableCapacity = strr['AvailableCapacity']
    FreeCapacity = strr['FreeCapacity'] 

    print(f"AvailableCapacity:{AvailableCapacity}")
    print(f"FreeCapacity:{FreeCapacity}")

    try:
        av_time = re.findall(r'\d{2}:\d{2}:\d{2}', AvailableCapacity)[0] 
        # print (time)
        av_time = av_time.split(':')
    except:
        try:
            av_time = re.findall(r'\d{1}:\d{2}:\d{2}', AvailableCapacity)[0]
            av_time = av_time.split(':')
        except:
            av_time = ['0','0','0']
    print(f"av_time:{av_time}")

    try:
        av_days = re.findall(r'\w+ day*', AvailableCapacity)[0].replace(' day','') 
        # print (days)
    except:
        av_days = 0
    print(f"av_days:{av_days}")
    
    av_fullsec = (int(av_days) * 24 * 60 * 60) + (int(av_time[0]) * 60 * 60) + (int(av_time[1]) * 60) + (int(av_time[2]))

    try:
        fr_time = re.findall(r'\d{2}:\d{2}:\d{2}', FreeCapacity)[0] 
        # print (time)
        fr_time = fr_time.split(':')
    except:
        try:
            fr_time = re.findall(r'\d{1}:\d{2}:\d{2}', FreeCapacity)[0]
            fr_time = fr_time.split(':')
        except:
            fr_time = ['0','0','0']
    print(f"fr_time:{fr_time}")
    try:
        fr_days = re.findall(r'\w+ day*', FreeCapacity)[0].replace(' day','') 
    # print (days)
    except:
        fr_days = 0
    print(f"fr_days:{fr_days}")
    fr_fullsec = (int(fr_days) * 24 * 60 * 60) + (int(fr_time[0]) * 60 * 60) + (int(fr_time[1]) * 60) + (int(fr_time[2]))
    try:
        proc = round(((av_fullsec - fr_fullsec) / av_fullsec * 100))
    except ZeroDivisionError:
        proc = -1
    return(proc)