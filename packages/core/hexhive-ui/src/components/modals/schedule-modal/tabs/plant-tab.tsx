import React, {
  Component
} from 'react';

import {TransferList} from '../../../transfer-list';

export default class PlantTab extends Component<any, any> {


  not(a: any[], b: any[]){
    return a.filter(value => b.indexOf(value) === -1);
  }
  
  onAdd(items: any[]){
    let selected = this.props.selected;
    this.props.onChange(selected.concat(items));
  }

  onRemove(items: any[]){
    let selected = this.props.selected;
    this.props.onChange(this.not(selected, items));
  }

  render(){
    const { inputData, selected } = this.props;
    return (
      <div className="plant-tab">
        <TransferList
          assignedKey={inputData.assigned.key}
          assignedList={inputData.assigned.data}
          labelKey={inputData.labelKey}
          options={inputData.data.filter((x: any) => x.Name).sort((a: any, b: any) => {
             return a.Name.localeCompare(b.Name, 'en', { numeric: true }) 
          })}
          selected={selected} 
          onAdd={this.onAdd.bind(this)}
          onRemove={this.onRemove.bind(this)}/>
      </div>
    );
  }
}