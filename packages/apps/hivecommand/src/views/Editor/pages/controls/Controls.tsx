import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, List, Button, Collapsible, TextInput, Select, CheckBox } from 'grommet'
import { InfiniteCanvas, ContextMenu, IconNodeFactory, InfiniteCanvasNode, ZoomControls, InfiniteCanvasPath, BumpInput } from '@hexhive/ui';
import { HMINodeFactory } from '../../../../components/hmi-node/HMINodeFactory';
import { NodeDropdown  } from '../../../../components/node-dropdown';
import { BallValve, Blower, Conductivity, Sump,  DiaphragmValve, UfMembrane, Filter, FlowSensor, PressureSensor, Pump, SpeedController, Tank } from '../../../../assets/hmi-elements';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import * as HMIIcons from '../../../../assets/hmi-elements'
import { Nodes, Add, Aggregate, Subtract, RotateLeft, RotateRight } from 'grommet-icons'
import Settings from './Settings'
import { nanoid } from 'nanoid';
import { useMutation } from '@hexhive/client';
import { pick } from 'lodash';
import { throttle } from 'lodash';
import { HMIGroupModal } from 'apps/hivecommand/src/components/modals/hmi-group';

export const Controls = (props) => {
    
    const [ selected, _setSelected ] = useState<{key?: "node" | "path", id?: string}>({})
    const selectedRef = useRef<{selected?: {key?: "node" | "path", id?: string}}>({})
    const setSelected = (s: {key?: "node" | "path", id?: string}) => {
        _setSelected(s)
        selectedRef.current.selected = s;
    }

    const [ target, setTarget ] = useState<{x?: number, y?: number}>({})

    const [ menuOpen, openMenu ] = useState<string | undefined>(undefined);

    const [ nodes, setNodes ] = useState<InfiniteCanvasNode[]>([])
    const [ paths, _setPaths ] = useState<InfiniteCanvasPath[]>([])
    
    const pathRef = useRef<{paths: InfiniteCanvasPath[]}>({paths: []})

    const setPaths = (paths: InfiniteCanvasPath[]) => {
        _setPaths(paths)
        pathRef.current.paths = paths;
    }

    const updateRef = useRef<{addPath?: (path: any) => void, updatePath?: (path: any) => void}>({
        updatePath: (path) => {
            let p = pathRef.current.paths.slice()
            let ix = p.map((x) => x.id).indexOf(path.id)
            p[ix] = path;
            setPaths(p)
        },
        addPath: (path) => {
            let p = pathRef.current.paths.slice()
            p.push(path)
            setPaths(p)
        }
    })

    const nodeMenu = [
        {
            icon: <Blower width="40px" height="40px" />,
            label: "Blower",
            width: 50,
            height: 50,
            extras: {
                icon: "Blower",
                ports: [
                    {
                        id: 'out',
                        x: -30,
                        y: 25
                    }
                ]
            }
        },
        {
            icon: <Pump width="40px" height="40px" />,
            label: "Pump",
            extras: {
                icon: "Pump",
                ports: [
                    {
                        id: 'in',
                        x: -30,
                        y:  35
                    },
                    {
                        id: 'out',
                        x: 90,
                        y: 45,
                        rotation: 180
                    }
                ]
            }
        },
        {
            icon: <BallValve width="40px" height="40px" />,
            label: "Ball Valve",
            extras: {
                icon: "BallValve",
                ports: [
                    {
                        id: 'in',
                        x: -40,
                        y: 35
                    },
                    {
                        id: 'out',
                        x: 100,
                        y: 55,
                        rotation: 180
                    }
                ]
            }
        },
        {
            icon: <DiaphragmValve width="40px" height="40px" />,
            label: "Diaphragm Valve",
            extras: {
                icon: "DiaphragmValve",
                ports: [
                    {
                        id: 'in',
                        x: -40,
                        y: 35
                    },
                    {
                        id: 'out',
                        x: 100,
                        y: 55,
                        rotation: 180
                    }
                ]
            }
        },
        {
            icon: <Tank width="40px" height="40px" />,
            label: "Tank",
            extras: {
                icon: "Tank",
                ports: [
                    {
                        id: 'in',
                        x: 10,
                        y: -20,
                        rotation: 90
                    },
                    {
                        id: 'out',
                        x: 70,
                        y: -20,
                        rotation: 90
                    }
                ]
            }
        },
        {
            icon: <PressureSensor width="40px" height="40px" />,
            label: "Pressure Sensor",
            extras: {
                icon: "PressureSensor",
                ports: [
                    {
                        id: 'in',
                        x: -5,
                        y: 65
                    },
                    {
                        id: 'out',
                        x: 70,
                        y: 82,
                        rotation: 180
                    }
                ]
            }
        },
        {
            icon: <FlowSensor width="40px" height="40px" />,
            label: "Flow Sensor",
            extras: {
                icon: "FlowSensor",
                ports: [
                    {
                        id: 'in',
                        x: -5,
                        y: 65
                    },
                    {
                        id: 'out',
                        x: 70,
                        y: 82,
                        rotation: 180
                    }
                ]
            }
        },
        {
            icon: <Conductivity width="40px" height="40px" />,
            label: "Conductivity Sensor",
            extras: {
                icon: "Conductivity",
                ports: [
                    {
                        id: 'in',
                        x: -5,
                        y: 65
                    },
                    {
                        id: 'out',
                        x: 70,
                        y: 82,
                        rotation: 180
                    }
                ]
            }
        },
        {
            icon: <SpeedController width="40px" height="40px" />,
            label: "Speed Controller",
            extras: {
                icon: "SpeedController" 
            }
        },
        {
            icon: <UfMembrane width="40px" height="40px" />,
            label: "UF Membrane",
            extras: {
                icon: "UFMembrane"
            }
        },
        {
            icon: <Sump width="40px" height="40px" />,
            label: "Sump",
            extras: {
                icon: "Sump"
            }
        }
    ]


    const client = useApolloClient()

    const { data } = useQuery(gql`
        query Q ($id: ID){
            commandPrograms(where: {id: $id}){
                id
                name

                hmi {
                    id
                    name
                    nodes {
                        id
                        type {
                            name
                            width
                            height
                            ports {
                                key
                                x
                                y
                                rotation
                            }
                        }
                        devicePlaceholder {
                            id
                            name
                        }
                        x
                        y

                        showTotalizer
                        rotation
                        scaleX
                        scaleY

                        inputs {
                            id
                            type {
                                name
                            }
                        }

                        inputsConnection {
                            edges {
                                id
                                sourceHandle
                                targetHandle
                                node {
                                    id
                                }
                            }
                        }

                        outputs {
                            id
                            type {
                                name
                                ports {
                                    x
                                    y
                                }
                            }
                        }

                        outputsConnection {
                            edges {
                                id
                                sourceHandle
                                targetHandle
                                points {
                                    x
                                    y
                                }
                                node {
                                    id
                                }
                            }
                        }
                    }
                }

                devices {
                    id
                    name
                    type {
                        id
                        name
                    }
                }
            }
        }
    `, {
        variables: {
            id: props.match.params.id
        }
    })
    
    const refetch = () => {
        client.refetchQueries({include: ['Q']})
    }

    const [ addHMINode, addHMIInfo ] = useMutation((mutation, args: {type: string, x: number, y: number}) => {
        const program = mutation.updateCommandPrograms({
            where: {id: props.match.params.id},
            update: {
                hmi: [{
                    where: {node: {id: props.activeProgram}},
                    update: {
                        node: {
                            nodes: [{create: [{node: {
                                type: {connect: {where: {node: {name: args.type}}}},
                                x: args.x,
                                y: args.y
                            }}]}]
                        }
                    }
                }]
            }
        })
        return {
            item: {
                ...program.commandPrograms[0]
            }
        }
    })

    const [ assignHMINode, assignInfo ] = useMutation((mutation, args: {
        id: string,
        placeholder: string
    }) => {
        const updated = mutation.updateCommandHMINodes({
            where: {id: args.id},
            update: {
                devicePlaceholder: {connect: {where: {node: {id: args.placeholder}}}}
            }
        })
        return {
            item: {
                ...updated.commandHmiNodes[0]
            }
        }
    })

    const [ updateHMINodeRotation, updateRotation ] = useMutation((mutation, args: {
        id: string,
        rotation: number
    }) => {
        const item = mutation.updateCommandHMINodes({
            where: {id: args.id},
            update: {
                rotation: args.rotation
            }
        })

        return {
            item: {
                ...item.commandHmiNodes[0]
            }
        }
    })

    const [ updateHMINodeTotalizer, updateTotalizer ] = useMutation((mutation, args: {
        id: string,
        totalize: boolean
    }) => {
        const item = mutation.updateCommandHMINodes({
            where: {id: args.id},
            update: {
                showTotalizer: args.totalize,
            }
        })

        return {
            item: {
                ...item.commandHmiNodes[0]
            }
        }
    })


    const [ updateHMINodeScale, updateScale ] = useMutation((mutation, args: {
        id: string,
        scale: {x?: number, y?: number}
    }) => {

        let update : any = {};
        if(args.scale.x) update.scaleX = args.scale.x;
        if(args.scale.y) update.scaleY = args.scale.y;

        const item = mutation.updateCommandHMINodes({
            where: {id: args.id},
            update: update
        })

        return {
            item: {
                ...item.commandHmiNodes[0]
            }
        }
    })

    const [ updateHMINode, updateInfo ] = useMutation((mutation, args: {
        id: string,
        x: number,
        y: number
    }) => {
        const updated = mutation.updateCommandHMINodes({
            where: {id: args.id},
            update: {
                x: args.x,
                y: args.y
            }
        })
        return {
            item: {
                ...updated.commandHmiNodes[0]
            }
        }
    })

    const [ deleteSelected, deleteInfo ] = useMutation((mutation, args: {
        selected: {type: "node" | "path", id: string}[]
    }) => {

        let query : any = {};
        let nodes = args.selected.filter((a) => a.type == "node").map((x) => x.id)
        let _paths = args.selected.filter((a) => a.type == "path").map((x) => x.id)

        let disconnectInfo : any = {};
        let deleteInfo : any = {};
        if(_paths.length > 0){
            let path = paths.find((a) => a.id == _paths?.[0]);
            disconnectInfo = mutation.updateCommandHMINodes({
                where: {id: path.source},
                update: {
                    outputs: [{disconnect: [{
                        where: {
                            edge: {
                                sourceHandle: path.sourceHandle,
                                targetHandle: path.targetHandle
                            },
                            node: {
                                id: path.target
                            }}
                    }]}]
                }
            })
        }
        if(nodes.length > 0){
            query = {
                id_IN: nodes,
            }
        
            deleteInfo = mutation.deleteCommandHMINodes({
                where: query
            })
          
        }
          return {
                item: {
                    ...(deleteInfo || {}),
                    ...(disconnectInfo?.commandHmiNodes?.[0] || {})
                }
            }
    })

    const [ updateConnection ] = useMutation((mutation, args : {
        id: string,
        source: string,
        sourceHandle: string,
        target: string,
        targetHandle: string,
        points: {x: number, y: number}[]
    }) => {
       const item = mutation.updateCommandHMINodes({
           where: {id: args.source},
            update: {
                outputs: [{
                    where: {
                        edge: {
                            id: args.id
                        }
                    },
                    update: {
                        edge: {
                            points: args.points.map((x) => pick(x, ["x", "y"]))
                        }
                    }
                }]
            }
        })
        return {
            item: {
                ...item.commandHmiNodes?.[0]
            }
        }
    })

    const throttledUpdateConnection = throttle(updateConnection, 500)

    const [ createConnection, connectInfo ] = useMutation((mutation, args: {
        source: string,
        sourceHandle: string,
        target?: string,
        targetHandle?: string,
        points?: {x: number, y: number}[]
    }) => {
        console.log(args.points)
        const updated = mutation.updateCommandHMINodes({
            where: {id: args.source},
            update: {
                outputs: [{
                    connect: [{ 
                        where: {node: {id: args.target}}, 
                        edge: {
                            sourceHandle: args.sourceHandle,
                            points: args.points.map((x) => pick(x, ["x", "y"])) || [],
                            targetHandle: args.targetHandle,
                            // points: args.points
                        }
                    }] 
                }]
            }
        })
        return {
            item: {
                ...updated.commandHmiNodes[0]
            }
        }
    })

    const devices = data?.commandPrograms?.[0]?.devices
    
    useEffect(() => {
        let program = data?.commandPrograms?.[0]
        if(program && props.activeProgram){

            console.log("NODES", (program.hmi).find((a) => a.id == props.activeProgram).nodes)
            setNodes((program.hmi).find((a) => a.id == props.activeProgram).nodes.map((x) => ({
                id: x.id,
                x: x.x,
                y: x.y,
                width: `${x?.type?.width || 50}px`,
                height: `${x?.type?.height || 50}px`,
                extras: {
                    devicePlaceholder: x.devicePlaceholder,
                    rotation: x.rotation || 0,
                    scaleX: x.scaleX || 1,
                    scaleY: x.scaleY || 1,
                    showTotalizer: x.showTotalizer || false,
                    iconString: x.type?.name,
                    icon: HMIIcons[x.type?.name],
                    ports: x?.type?.ports?.map((y) => ({...y, id: y.key})) || []
                },
                type: 'hmi-node',
                
            })))

            setPaths((program.hmi).find((a) => a.id == props.activeProgram).nodes.map((x) => {
                let connections = x.outputsConnection?.edges?.map((edge) => ({
                    id: edge.id,
                    points: edge.points || [],
                    source: x.id,
                    sourceHandle: edge.sourceHandle,
                    target: edge.node.id,
                    targetHandle: edge.targetHandle
                })) 
                return connections
            }).reduce((prev, curr) => {
                return prev.concat(curr)
            }, []))
        }
    }, [data?.commandPrograms?.[0], props.activeProgram])

  
    const changeMenu = (view: string) => {
        openMenu(view == menuOpen ? undefined : view)
    }

    const renderMenu = () => {
        switch(menuOpen){
            case 'nodes':
                return (
                    <NodeDropdown
                    items={nodeMenu.map((node) => ({
                        ...node,
                        icon: (
                            <Box 
                                style={{cursor: 'pointer'}}
                                background="neutral-4" 
                                round="xsmall" 
                                pad={{horizontal: "xsmall"}}>
                                {node.icon} 
                            </Box>
                        )
                    }))}
                    />
                )
            case 'config':
                let item = selected.key == 'node' ? nodes.find((a) => a.id == selected.id) : undefined
                return (
                    <Box gap="xsmall" focusIndicator={false}>
                        <Box justify="between" align="center" direction="row">
                            <Text>Config</Text>
                            <Button plain hoverIndicator style={{padding: 6, borderRadius: 3}} icon={<Aggregate size="20px" />} />
                        </Box>
                        <Select
                            valueKey={{reduce: true, key: "id"}}
                            labelKey="name"
                            value={item?.extras?.devicePlaceholder?.id}
                            onChange={({value}) => {
                                assignHMINode({args: {
                                    id: selected.id,
                                    placeholder: value
                                }}).then(() => {
                                    refetch()
                                })
                            }}
                            options={devices.filter((a) => a.type.name.replace(/ /, '').indexOf(item?.extras?.iconString) > -1 )}
                            placeholder="Device" />
                        
                        <Box justify="end" direction="row">
                            <CheckBox  
                                checked={item?.extras?.showTotalizer} 
                                onChange={(e) => {
                                    updateHMINodeTotalizer({
                                        args: {
                                            id: selected.id,
                                            totalize: e.target.checked
                                        }
                                    }).then(() => {
                                        refetch()
                                    })
                                }}
                                reverse 
                                label="Show Totalizer" />
                        </Box>
                        <BumpInput 
                            placeholder="Rotation"
                            type="number"
                            leftIcon={<RotateLeft size="small" />}
                            rightIcon={<RotateRight size="small" />}
                            value={item?.extras?.rotation}
                            onLeftClick={() => {
                                updateHMINodeRotation({
                                    args: {
                                        id: selected.id,
                                        rotation: (item?.extras?.rotation || 0) - 90
                                    }
                                }).then(() => {
                                    refetch()
                                })
                            }}
                            onRightClick={() => {
                                               updateHMINodeRotation({
                                        args: {
                                            id: selected.id,
                                            rotation: (item?.extras?.rotation || 0) + 90
                                        }
                                    }).then(() => {
                                        refetch()
                                    })
                            }}
                            onChange={(e) => {
                                updateHMINodeRotation({
                                    args: {
                                        id: selected.id,
                                        rotation: parseFloat(e)
                                    }
                                }).then(() => {
                                    refetch()
                                })

                            }}
                            />

                        <BumpInput 
                            placeholder="Scale X"
                            type="number"
                            leftIcon={<Subtract size="small" />}
                            rightIcon={<Add size="small" />}
                            value={item?.extras?.scaleX}
                            onLeftClick={() => {
                                updateHMINodeScale({
                                    args: {
                                        id: selected.id,
                                        scale: {x: parseFloat(item?.extras?.scaleX || 0) - 1}
                                    }
                                }).then(() => {
                                    refetch()
                                })
                            }}
                            onRightClick={() => {
                                updateHMINodeScale({
                                        args: {
                                            id: selected.id,
                                            scale: {x: parseFloat(item?.extras?.scaleX || 0) + 1}
                                        }
                                    }).then(() => {
                                        refetch()
                                    })
                            }}
                            onChange={(e) => {
                                updateHMINodeScale({
                                    args: {
                                        id: selected.id,
                                        scale: {x: parseFloat(e)}
                                    }
                                }).then(() => {
                                    refetch()
                                })

                            }}
                            />
                       <BumpInput 
                            placeholder="Scale Y"
                            type="number"
                            leftIcon={<Subtract size="small" />}
                            rightIcon={<Add size="small" />}
                            value={item?.extras?.scaleY}
                            onLeftClick={() => {
                                updateHMINodeScale({
                                    args: {
                                        id: selected.id,
                                        scale: {y: parseFloat(item?.extras?.scaleY || 0) - 1}
                                    }
                                }).then(() => {
                                    refetch()
                                })
                            }}
                            onRightClick={() => {
                                updateHMINodeScale({
                                        args: {
                                            id: selected.id,
                                            scale: {y: parseFloat(item?.extras?.scaleY || 0) + 1}
                                        }
                                    }).then(() => {
                                        refetch()
                                    })
                            }}
                            onChange={(e) => {
                                updateHMINodeScale({
                                    args: {
                                        id: selected.id,
                                        scale: {y: parseFloat(e)}
                                    }
                                }).then(() => {
                                    refetch()
                                })

                            }}
                            />
                      
                        <Box>
                 
                        </Box>
                    </Box>
                )
        }
       
    }

    const watchEditorKeys = () => {
        
            if(selectedRef.current?.selected?.id){
                deleteSelected({
                    args: {
                        selected: [selectedRef.current.selected].map((x) => ({
                            type: x.key,
                            id: x.id
                        }))
                    }
                }).then(() => {
                    refetch()
                })
            }
     
    }
    
	return (
		<Box 
            direction="row"
            flex>
            <HMIGroupModal
                open={true}
                nodeMenu={nodeMenu} />
			<InfiniteCanvas
                onDelete={watchEditorKeys}
                onSelect={(key, id) => {
                    console.log("SELECTEDDDD", key, id)
                    setSelected({
                        key,
                        id
                    })
                }} 
                menu={(<Collapsible 
                    open={Boolean(menuOpen)}
                    direction="horizontal">
                    <Box
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        pad={'xsmall'} 
                        width="small">
                            {renderMenu()}
                  
                    </Box>
                </Collapsible>)}
                editable={true}
                nodes={nodes}
                paths={pathRef.current.paths}
                factories={[new IconNodeFactory(), new HMINodeFactory()]}
                onPathCreate={(path) => {
                    // console.log("CREATE", path)

                    // setPaths([...paths, path])
                    console.log("PATH CREATE ", path)

                    
                    updateRef.current?.addPath(path);
                }}
                onPathUpdate={(path) => {
              
                    console.log("UPDATE PATH", path)

                    if(path.source && path.target && path.targetHandle){
                        console.log("CREATE PATH")

                        createConnection({
                            args: {
                                // id: path.id,
                                source: path.source,
                                sourceHandle: path.sourceHandle,
                                target: path.target,
                                targetHandle: path.targetHandle,
                                points: path.points
                            }

                        }).then(() => {
                            refetch()
                        })
                    }

                    updateRef.current?.updatePath(path)
                }}
                onNodeUpdate={(node) => {

                    console.log("UPDATE", nodes)
                    let n = nodes.slice()
                    let ix = n.map((x) => x.id).indexOf(node.id)
                    n[ix] = node;
                    setNodes(n)

                    updateHMINode({args: {id: node.id, x: node.x, y: node.y}}).then(() => {
                        refetch()
                    })
                    // console.log("NODES", node)
                }}
                onDrop={(position, data) => {
                    // if(view == "Program"){
                    //     addProgramNode({args: {
                    //         x: position.x,
                    //         y: position.y,
                    //         type: data.extras.icon
                    //     }})
                    // }else{
                        addHMINode({args: {
                            x: position.x,
                            y: position.y,
                            type: data.extras.icon
                        }})
                    // }
                    // console.log(position, data)
                    
                    data.extras.icon = HMIIcons[data.extras.icon]
                    
                    setNodes([...nodes, {
                        id: nanoid(),
                        x: position.x,
                        y: position.y,
                        extras: {
                            icon: data.extras.icon,
                            rotation: 0
                        },
                        type: HMINodeFactory.TAG
                    }])
                }}

                onRightClick={(target, position) => {
                    setTarget(position)
                }}
                >
  
                <ZoomControls anchor={{vertical: 'bottom', horizontal: 'right'}} />
            </InfiniteCanvas>
           
            <Box background="accent-1" >
                <Button
                    active={menuOpen == 'nodes'}
                    onClick={() => changeMenu('nodes')}
                    hoverIndicator
                    icon={<Nodes />} />
                <Button 
                    active={menuOpen == 'config'}
                    onClick={() => changeMenu('config')}
                    hoverIndicator
                    icon={<Settings />} />
            </Box>
		</Box>
	)
}