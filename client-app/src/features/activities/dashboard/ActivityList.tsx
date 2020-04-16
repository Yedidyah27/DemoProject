import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/Stores/activityStore'

interface IProps{

}

export const ActivityList:React.FC<IProps> = () => {
    const activityStore = useContext(ActivityStore);
     const {activitiesByDate, selectActivity, deleteActivity, target, submitting} = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(act =>(
                    <Item key={act.id}>
                    <Item.Content>
                        <Item.Header as='a'>{act.title}</Item.Header>
                        <Item.Meta>{act.date}</Item.Meta>
                        <Item.Description>
                        <div>{act.description}</div>
                        <div>{act.city}, {act.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() =>(selectActivity(act.id))} 
                                    loading = {target === `${act.id}Submit` && submitting}
                                    name={`${act.id}Submit`}
                                    floated='right' 
                                    content='View' 
                                    color='blue'/>
                                    <Button onClick={(e) =>(deleteActivity(act.id, e))} 
                                    floated='right' 
                                    loading = {target === `${act.id}Delete` && submitting}
                                    name={`${act.id}Delete`}
                                    content='Delete' 
                                    color='red'/>
                            <Label basic content={act.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}                  
            </Item.Group>
        </Segment>        
    )
}

export default observer (ActivityList);
