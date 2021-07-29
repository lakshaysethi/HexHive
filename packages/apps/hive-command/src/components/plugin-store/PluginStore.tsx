import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { PluginCard } from './PluginCard';

export interface PluginStoreProps {
    plugins?: {
        _id: string;
        name: string;
        owner?: string;
        enabled?: boolean;
    }[]

    onCreate?: any;
    onClickRow?: (row: {_id: string, name: string, owner?: string, enabled?: boolean}) => void;
}

export const PluginStore: React.FC<PluginStoreProps> = (props) => {
    return (
        <Box
        
            elevation="small"
            direction="column"
            width={'80vw'}>

            <Box 
                pad="small"
                elevation="small"
                background="dark-2"
                align="center"
                direction="row">
                <TextInput
                    width={'small'}
                    placeholder="Search..." />
                <Button
                    onClick={props.onCreate} 
                    primary
                    color="accent-1" 
                    label="Create"/>
            </Box>
          

            <Box 
                pad="small"
                direction="row"
                wrap={true}
                gap="small">
                {props.plugins?.map((plugin) => (
                    <PluginCard 
                        onClick={() => props.onClickRow?.(plugin)}
                        plugin={plugin} />
                ))} 
           
            </Box>
        </Box>
    )
}