import { ObjectTypeComposerFieldConfigMapDefinition } from "graphql-compose";
import sql from 'mssql'
import moment from "moment";
import { Connector } from "../../connector";
import { ScheduleItem } from '@hexhive/types'

 /*Returns all jobs from vw_Sched_Jobs*/
 /*getJobs(cb){
    new sql.Request().query("'").then((result) => {
      cb(null, result.recordsets[0]);
    });
  }

  getJobByID(id, cb){
    var request = new sql.Request();
    request.input('jobID', sql.Int, id);
 

  }

  /* Requests all jobs between a calculated endpoint, endpoint is calculated from checking the DurationType
   * and adding the Duration to it from the start date*
  getJobsByDate(date, cb){
    var request = new sql.Request();
    request.input('startTime', sql.VarChar, date.start);
    /* The following conversion for months assumes a 30 day month *
    request.input('endTime', sql.VarChar, date.end);

  }*/

const Queries = (connector: Connector) => {
    let query :  ObjectTypeComposerFieldConfigMapDefinition<any, any> = {
    ScheduleById: {
        type: 'ScheduleItem',
        args: {
            id: 'ID'
        },
        resolve: async (root, args) => {
           return await ScheduleItem.findById(args.id)
        }
    },
    ScheduleMany: {
        type: '[ScheduleItem]',
        args: {
            status: "String"
        },
        resolve: async (root, args) => {
            return await ScheduleItem.find({})
        }
    }
}
return query;
}

const Mutations = (connector: Connector) : ObjectTypeComposerFieldConfigMapDefinition<any, any>  => {
     return {
        createScheduleItem: {
            type: 'ScheduleItem',
            args: {
                item: "ScheduleItemInput"
            },
            resolve: async (root, args) => {
                let schedule = new ScheduleItem({
                    ...args.item
                })

                await schedule.save();
                return schedule;
            }
        }
    // addProject: {
    //     type: 'Project',
    //     args: {
    //         project: "ProjectInput"
    //     },
    //     resolve: async (root, args) => {
    //         let project = new Project({
    //             ...args.project
    //         })

    //         return await project.save();
    //     }
    // },
    // updateProject: {
    //     type: 'Project',
    //     args: {
    //         id: "String",
    //         project: "ProjectInput"
    //     },
    //     resolve: () => {
    //         console.log("Update project")
    //     }
    // },
    // removeFileFromProject: {
    //     type: 'Boolean',
    //     args: {
    //         project: "String",
    //         id: "String"
    //     },
    //     resolve: async (root, args) => {
    //         let project = await Project.findOne({id: args.project})
    //         if(project){
    //             project.files?.splice(project.files?.indexOf(args.id), 1)
    //             await project.save()
    //             return true;
    //         }
    //         return false;
    //     }
    // },
    // updateFile: {
    //     type: 'File',
    //     args: {
    //         id: "String",
    //         name: "String",
    //         status: "String"
    //     }, 
    //     resolve: async (root, args) => {
    //         let update : any = {
    //         }

    //         const file = await File.findById(args.id)

    //         if(file){
    //             if(args.name) file.name = args.name;
    //             if(args.status) file.status = args.status;

    //             console.log(args.id, update)
    //             let result = await file?.save()
    //         }
    //         return file
    //     }
    // },
    // updateFiles: {
    //     type: '[File]',
    //     args: {
    //         ids: "[String]",
    //         status: "String"
    //     },
    //     resolve: async (root, args) => {
    //         let result = await File.updateMany({_id: {$in: args.ids}}, {$set: {status: args.status}})
    //         return result;
    //     }
    // },
    // removeProject: {
    //     type: 'Boolean'
    // }
    }
}

export {
    Queries,
    Mutations
}