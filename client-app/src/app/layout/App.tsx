import React, {useEffect, useContext} from 'react';
import { Container } from 'semantic-ui-react'
import Navbar from '../../features/nav/navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../Stores/activityStore';
import {observer} from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial){
    return <LoadingComponent content ='Loading activities...'/>
  }

    return (
      <div>
        <Navbar/>> 
        <Container style={{marginTop:'7em'}}>          
        <ActivityDashboard />    
        </Container>    
      </div>
    );
  
} 

export default observer (App);
