export const getManagers = (owner?: string, managers?: string[], add?: string[], remove?: string[]) => {
    console.log("managers", managers, remove, add)
      let temp = add?.filter((a) => {
          let _removed = !((remove || []).indexOf(a) > -1)
          let _manager = !((managers || []).indexOf(a) > -1)
          return _manager && _removed
      })
      console.log(temp)
  
      let output = ([owner]).concat(managers || [])
      if(temp){
          output = output.concat(temp)
      }
      return output.filter((a) => a && !((remove || []).indexOf(a) > -1))
  }