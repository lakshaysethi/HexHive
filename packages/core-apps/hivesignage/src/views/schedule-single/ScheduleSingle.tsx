import React from 'react';
import { Box, Button, Text } from 'grommet';
import { client, useQuery } from '@hexhive-api/signage';
import { Analytics, Scorecard, Monitor, Map, SchedulePlay } from 'grommet-icons';
import { Route, Switch } from 'react-router';
import { ScheduleLocations } from './views/ScheduleLocations';
import { ScheduleCampaigns } from './views/ScheduleCampaigns';
import { ScheduleReports } from './views/ScheduleReports';
import { ScheduleSingleProvider } from './context';
import { useQuery as useApolloQuery, useApolloClient, gql } from '@apollo/client'
import { ScheduleTiers } from './views/ScheduleTiers';
import { ScheduleScreens } from './views/ScheduleScreens';
export const ScheduleSingle = (props) => {
	const query = useQuery()
	const client = useApolloClient()

	const { data } = useApolloQuery(gql`
		query Q ($id: ID){
			schedules(where: {id: $id}) {
				id
				name

				screens {
					id
					name

					width
					height
				}
				
				locations {
					id
					name
				}

				campaigns {
					id
					name
				}

				tiers {
					id
					name
					percent
					slots
				}

				campaignsConnection {
					edges {
						tier
						startDate
						endDate
						screen
						node {
							id
							name
						}
					}
				}

			
			}
		}
	`)

	const refresh = () => {
		client.refetchQueries({include: ['Q']})
	}

	const schedule = data?.schedules?.[0]

	const menu = [ 
		{
			route: 'screens',
			icon: <Monitor />,
			label: 'Screens'
		},
		{
			route: `locations`,
			icon: <Map />,
			label: 'Locations'
		},
		{
			route: 'campaigns',
			icon: <SchedulePlay />,
			label: 'Campaigns'
		},
		{
			route: 'tiers',
			icon: <Scorecard />
		},
		{
			route: 'reports',
			icon: <Analytics />,
			label: 'Reports'
		}
	]
	return (
		<ScheduleSingleProvider value={{
			scheduleId: props.match.params.id,
			locations: schedule?.locations,
			screens: schedule?.screens,
			campaigns: schedule?.campaignsConnection?.edges?.map(edge => ({
				...edge.node, 
				screen: edge.screen,
				tier: schedule?.tiers.find((a) => a.id == edge.tier), 
				dates: [edge.startDate, edge.endDate]
			})),
			tiers: schedule?.tiers,
			refresh
		}}>
		<Box 
			overflow="hidden"
			round="xsmall"
			flex 
			elevation="small" 
			background="neutral-1">
			<Box background="accent-2" pad="xsmall" direction="row">
				<Text>{schedule?.name}</Text>
			</Box>
			<Box direction="row" flex>
				<Box elevation="small" background="accent-1">
					{menu.map((menu_item) => (
						<Box direction="row">
							<Button onClick={() => props.history.push(`${props.match.url}/${menu_item.route}`)} hoverIndicator icon={menu_item.icon} />
						</Box>
					))}
				</Box>
				<Box flex>
					<Switch>
						<Route path={`${props.match.url}/screens`} component={ScheduleScreens} />
						<Route path={`${props.match.url}/locations`} component={ScheduleLocations} />
						<Route path={`${props.match.url}/campaigns`} component={ScheduleCampaigns} />
						<Route path={`${props.match.url}/tiers`} component={ScheduleTiers} />
						<Route path={`${props.match.url}/reports`} component={ScheduleReports} />
					</Switch>
				</Box>
			</Box>
		</Box>
		</ScheduleSingleProvider>
	)
}