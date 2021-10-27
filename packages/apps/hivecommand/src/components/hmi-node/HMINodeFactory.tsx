import React from "react";
import { AbstractWidgetFactory } from "@hexhive/ui";
import { HMINode } from "./HMINode";

export class HMINodeFactory extends AbstractWidgetFactory {

    public static TAG : string = 'hmi-node';
    constructor(){
        super('hmi-node')
    }

    public generateWidget(event: any): JSX.Element {
        return (<HMINode  {...event} />)
    }
    public parseModel(model: any) {
        return {
            ...model,
            ports: model.ports ? model.ports : [
                {
                    name: "in",
                    type: "base"
                    
                },
                {
                    name: 'out',
                    type: 'base'
                }
            ]
        }
    }

}