import React, { Component, useState} from 'react';

import { Switch, Link, Route , generatePath, matchPath} from 'react-router-dom';

import logo from '../../logo.svg';

//views, logo
import { Sidebar} from '@hexhive/ui';

// import RoutedView from '../../components/primatives/routed-view';

import {
  Calendar as Schedule,
  People,
  Timeline as TimelineIcon,
  Estimates,
  Projects,
  Equipment,
  Hiveflow
} from '../../assets'

import { Box, Spinner, Text } from 'grommet';
import { JobList } from '../jobs/job-list';
import { SingleJob } from '../jobs/job-one';
import { StaffList } from '../staff/employee-list';
import {Schedule as ScheduleView } from '../schedule';
import employeeOne from '../staff/employee-one';
import { PlantList } from '../plant/plant-list';
import Quotes from '../quotes';

const Timeline = React.lazy(() => import('../timeline/Timeline'))

// const Schedule = React.lazy(() => import('../schedule'))
// const Quotes = React.lazy(() => import('../quotes'))
// const Jobs = React.lazy(() => import('../jobs'))
// const Employees = React.lazy(() => import('../staff'))
// // const MonthView = React.lazy(() => import('../../components/workhub/planning-calendar'))
// const Plant = React.lazy(() => import('../plant'))


export const Dashboard : React.FC<any> = (props: any) => { 

  //  const [ view, setView ] = React.useState('schedule')
  // const [ alerts, setAlerts ] = useState<string[]>([])

  const alerts = []
  const active = window.location.pathname.replace(process.env.PUBLIC_URL, '')

  console.log(active)

  const views = () => {
    let login_type =  'email' //props.user.login_type;
    let views = []
    if(login_type == 'email'){
      views = [{
                  icon: <Schedule />,
                  label: "Schedule",
                  path: "/schedule",
                  component: <> </>,
                },
                {
                  icon: <TimelineIcon />,
                  label: "Timeline",
                  path: "/timeline",
                  component: <></>
                },
                {
                  icon: <Estimates />,
                  label: "Estimates",
                  path: "/estimates",
                  component: <></>,
                },
                {
                  icon: <Projects />,
                  label: "Projects",
                  path: "/projects",
                  component: <></>
                },
                {
                  icon: <People />,
                  label: "People",
                  path: "/people",
                  component: <></>
                }, 
                { 
                  icon: <Equipment />,
                  label: "Equipment",
                  path: "/equipment",
                  alerts: alerts.length,
                  component: <></>
                }
      ]
    }else{
      views = [
          {
            icon: "schedule",
            label: "Schedule",
            path: "/schedule",
            component: <></>,
          },
          {
            icon: 'check_circle_outline',
            label: "Projects",
            path: "/projects",
            component: <></>
          },
          {
            icon: 'people',
            label: "People",
            path: "/people",
            component: <></>
          }, 
          { 
            icon: 'directions_car',
            label: "Equipment",
            alerts: alerts.length,
            path: "/equipment",
            component: <></>
          }

      ]
    }
    return views;
  }

  console.log(props.match)

  // componentDidMount(){

  //   utils.plant.getAll().then((plants) => {
  //     console.log(plants)
  //     if(!plants.error){
  //       this.setState({
  //         alerts: (plants || []).filter((a) => utils.plant.getStatus(a.details) != "VALID"),
  //       })
  //     }
  //   })
  //     //Using testauth instead of actual route, change when
  //     //there is dashboard information for organizations
  //  }
      

      return (
         <Box 
          direction="row"
          flex 
          className="dashboard">
              <Sidebar
                onLogoClick={() => {
                    window.location.href = "/dashboard";
                }}
                logo={<Hiveflow style={{filter: 'invert(1)'}}/>}
                active={views().map((x) => matchPath(active, {path: x.path}) != null ).indexOf(true)}
                menu={views()} 
                onSelect={(x: any) => {
                  let path = generatePath(`${props.match.url}/:path`, {path: x.toLowerCase()})
                  props.history.push(path)
                }}/>

            <Box 
              background="neutral-4"
              flex 
              pad="xsmall">
            <React.Suspense fallback={(
              <Box 
                align="center"
                justify="center"
                flex>
                <Spinner size="medium" />
                <Text>Loading ...</Text>
              </Box>
            )}>
            <Switch>
                <Route path={`${props.match.url}/schedule`} component={ScheduleView} />
                <Route path={`${props.match.url}/projects`} exact component={JobList} />
                <Route path={`${props.match.url}/projects/:id`} component={SingleJob} />
                <Route path={`${props.match.url}/estimates`} exact component={Quotes} />
                <Route path={`${props.match.url}/people`} exact component={StaffList} />
                <Route path={`${props.match.url}/people/:id`} component={employeeOne} />
                <Route path={`${props.match.url}/equipment`} exact component={PlantList} />
                <Route path={`${props.match.url}/timeline`} component={Timeline} />
            </Switch>
              
            </React.Suspense>
            </Box>
                {/*<div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px'}}>
               <UserIcon style={{fontSize: '30px', cursor: 'pointer'}} onClick={() => {this.props.history.push('/admin')}}/>
                </div>*/}

 
         </Box>
      );
  
}

/*
<RoutedView 
                views={views()} />
*/

// export default connect((state) => {
//   let token = state.auth.token;
//   if(token){
//     return {user: jwtDecode(token)}
//   }else{
//     return {user: {}}
//   }
// }, (dispatch) => ({

// }))(App);