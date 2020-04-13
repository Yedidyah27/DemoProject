import React, {useState, useEffect} from 'react';
import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../../models/activity';
import Navbar from '../../features/nav/navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id == id)[0])
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
  const handleCreateActivity = (activity:IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }
  const handleEditActivity = (activity:IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }
  const handleDeleteActivity = (id:string) => {
    setActivities([...activities.filter(a => a.id !== id)])    
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(
      (response) =>{
        let activities: IActivity[] =[];
        response.data.forEach( a =>{
          a.date = a.date.split('.')[0];
          activities.push(a);
        })
        setActivities(activities)
      }
    ) 
  }, [])

    return (
      <div>
        <Navbar openCreateForm={handleOpenCreateForm}/>> 
        <Container style={{marginTop:'7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity!}
          editMode = {editMode}
          setEditMode ={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}>          
        </ActivityDashboard>
        </Container>    
      </div>
    );
  
} 

export default App;