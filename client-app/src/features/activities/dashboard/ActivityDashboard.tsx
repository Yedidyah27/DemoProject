import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/Stores/activityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface IProps{
    
}
export const ActivityDashboard: React.FC<IProps> = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]);
  
    if (activityStore.loadingInitial){
      return <LoadingComponent content ='Loading activities...'/>}
      
    return (
        <Grid>
            <Grid.Column width={10}>            
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}> 
                <h2>Activity Filter</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer (ActivityDashboard);
