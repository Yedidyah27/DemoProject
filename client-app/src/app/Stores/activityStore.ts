import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../../models/activity';
import agent from '../api/agent';

configure ({enforceActions: 'always'});

class ActivityStore{
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () =>{
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            runInAction('loading activities', () =>{
                activities.forEach( a =>{
                    a.date = a.date.split('.')[0];
                    this.activityRegistry.set(a.id, a); 
            });         
          });
        }catch(error){
            console.log(error);
        }
        runInAction('finalize loading activities',() =>{
            this.loadingInitial = false; 
        });          
    }

    @action createActivity = async (activity: IActivity) =>{
        this.submitting = true;
        try{
            await agent.Activities.create(activity);
            runInAction('create activity', () =>{
                this.activityRegistry.set(activity.id, activity);  
                this.editMode = false; 
            });
           }catch(error){
            console.log(error);
        }
        runInAction('finalize create', () =>{
            this.submitting = false;
        });    
    }
    @action openCreateActivity = () =>{
        this.editMode = true;
        this.selectedActivity = undefined;        
    }

    @action selectActivity = (id:string) =>{
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action openEditForm = (id : string) =>{
        this.editMode = true;
        this.selectedActivity = this.activityRegistry.get(id);
    }
    @action cancelEditForm = () =>{
        this.editMode = false;
        this.selectedActivity = undefined;
    }
    @action cancelSelectedActivity= () =>{
        this.selectedActivity = undefined;
    }

    @action editActivity = async (activity: IActivity) =>{
        this.submitting = true;
        try{
            await agent.Activities.update(activity);
            runInAction('edit activity', () =>{
                this.activityRegistry.set(activity.id, activity); 
                this.selectedActivity = activity; 
                this.editMode = false;
            });  
        }catch(error){
            console.log(error);
        }
        runInAction('finalize edit', () =>{
            this.submitting = false;
        });    
    }

    @action deleteActivity = async (id: string, event: SyntheticEvent<HTMLButtonElement>) =>{
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await agent.Activities.delete(id);
            runInAction('delete activity', () =>{
                this.activityRegistry.delete(id); 
            });              
        }catch(error){
            console.log(error);
        }
        runInAction('finalize delete', () =>{
            this.target = '';
            this.submitting = false;
        }); 
    }
}

export default createContext(new ActivityStore());