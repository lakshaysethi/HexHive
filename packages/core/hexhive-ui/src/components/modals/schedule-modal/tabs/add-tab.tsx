import { Anchor, Box, Button, Select, Tab, Tabs } from 'grommet';
import { Logout } from 'grommet-icons';
import React, { useMemo, useState } from 'react';
import PlantTab from './plant-tab';
import StaffTab from './staff-tab';
import NoteTab from './note-tab';
import { ISchedule } from '..';
import _ from 'lodash';

export interface AddTabProps {
    item?: ISchedule;
    onChange?: (item: any) => void;
    
    scheduledJobs?: any[];
    todaysSchedule?: any[];

    jobs?: any[];
    plants?: any;
    people?: any;
}

export const AddTab : React.FC<AddTabProps> = ({
    jobs = [],
    plants = [],
    people = [],
    item,
    onChange,
    scheduledJobs,
    todaysSchedule,

}) => {
    const [ jobSearch, setJobSearch ] = useState<string>('')
    
    const [selectedTab, setSelectedTab] = useState<string>('People')

    const tabs = [
        {
            label: "People",
            component: ( 
            <StaffTab
              onChange={(e: any) => onChange?.({...item, employees: e})}
              inputData={{
                assigned: {key: 'ID', data: scheduledJobs?.map((x: any) => x.employees)},
                labelKey: 'name',
                data: people
              }}
              selected={item?.employees || []}/>
            )
        },
        {
            label: "Equipment",
            component: (
                <PlantTab
                  onChange={(e: any) => onChange?.({...item, plant: e})}
                  inputData={{
                    assigned: {key: 'ID', data: todaysSchedule?.map((x) => x.plant)},
                    labelKey: 'Name',
                    data: plants || []
                  }}
                  selected={item?.plant || []}/>
            )
        },
        {
            label: "Notes",
            component: (
                <NoteTab 
                  data={item?.notes || []}
                  onChange={(e: any) => onChange?.({...item, notes: e})}/>
            )
        }
    ]

    const job_container : any = item?.job 

    const returnSelect = () => {
        if(job_container){
            if(job_container.id){
                return `${job_container.id}`
            }  
            return `${job_container.id}`
        }
        return ''
    }

    const memoJobs = useMemo(() => {
        let j = _.map(jobs, _.partialRight(_.pick, ['id', 'name']))
        return j.map((x: any) => ({...x, id: `${x.id}`}))
    }, [JSON.stringify(jobs)])

    console.log(returnSelect(), job_container, item?.job, jobs)
    return (
        <Box flex direction="column">
         <Box
          align="center"
          direction="row">
  
        <Box flex>
          <Select
            onSearch={(search) => setJobSearch(search)}
            placeholder="Select Job..."
            labelKey={(opt) => `${opt.id} - ${opt.name}`.substring(0, 42 + 7)}
            options={memoJobs.filter((a: any) => `${a.id} - ${a.name}`.indexOf(jobSearch) > -1)}
            value={returnSelect()}
            valueKey={{key: 'id', reduce: true}}
            onChange={({option}) => {
                console.log(option)
                onChange?.({...item, job: option})
            }} />
        </Box>
        {(item && item?.job) && 
        <Box
          direction="column"
          justify='center'>
          <Button  
            margin={"none"}
            hoverIndicator={true}
            a11yTitle="Go to Job"
            icon={<Logout />}
            href={`/dashboard/jobs/${item?.job?.JobID || item?.job.id}`}/>
        </Box>}
        </Box>

          <Box height={{max: '50vh'}}>
            <Tabs 
              alignControls="start">
              {tabs.map((tab) => (
                <Tab title={tab.label}>
                  {tab.component}
                </Tab>
              ))} 
            </Tabs>
          </Box>
        </Box>
    )
}