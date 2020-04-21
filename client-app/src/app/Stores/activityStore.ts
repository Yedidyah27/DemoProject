import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../../models/activity';
import agent from '../api/agent';

configure ({enforceActions: 'always'});

class ActivityStore{
    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
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

    @action loadActivity = async (id:string) =>{
        let act = this.getActivity(id);
        if (act) {
            this.activity = act;
        }else{
            this.loadingInitial = true;
            try{
                act = await agent.Activities.details(id);
                runInAction('getting activity', () =>{
                    this.activity = act;                    
                })
            }catch(error){
                console.log(error);
            }
            runInAction('finalize activity', () =>{
                this.loadingInitial = false;                    
            })
        }
    }
    @action clearActivity = () =>{
        this.activity = null;
    }

    getActivity = (id: string) =>{
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) =>{
        this.submitting = true;
        try{
            await agent.Activities.create(activity);
            runInAction('create activity', () =>{
                this.activityRegistry.set(activity.id, activity);   
            });
           }catch(error){
            console.log(error);
        }
        runInAction('finalize create', () =>{
            this.submitting = false;
        });    
    }
    @action openCreateActivity = () =>{
        this.activity = null;        
    }

    @action editActivity = async (activity: IActivity) =>{
        this.submitting = true;
        try{
            await agent.Activities.update(activity);
            runInAction('edit activity', () =>{
                this.activityRegistry.set(activity.id, activity); 
                this.activity = activity; 
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