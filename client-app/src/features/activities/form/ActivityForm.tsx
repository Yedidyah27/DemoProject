import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'
import {v4 as uuid} from 'uuid'
import ActivityStore from '../../../app/Stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'

interface DetailParams{
    id: string;
}

export const ActivityForm:React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, activity : initFormState, loadActivity, clearActivity} = activityStore;
    
    const [activity, setActivity] = useState<IActivity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:'',
    });
    useEffect(() =>{
        if (match.params.id && activity.id.length === 0){
            loadActivity(match.params.id).then(() =>{
                initFormState && setActivity(initFormState);
            });
        }
        return () =>{
            clearActivity();
        }
    }, [loadActivity, clearActivity, match.params.id, initFormState, activity.id.length])
    const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }
    const handleSubmit = ()=> {
            if (activity.id.length === 0){
            let newActivity = {... activity, id: uuid()};
            createActivity(newActivity).then(() =>{
                history.push(`/activity/${newActivity.id}`);
            });
        }else{
            editActivity(activity).then(() =>{
                history.push(`/activity/${activity.id}`);
            });
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title}/>
                <Form.TextArea rows={2} onChange={handleInputChange} name='description' placeholder='Description' value={activity.description}/>
                <Form.Input onChange={handleInputChange} placeholder='Category' name='category' value={activity.category}/>
                <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' name='date' value={activity.date}/>
                <Form.Input onChange={handleInputChange} placeholder='City' name='city' value={activity.city}/>
                <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue' value={activity.venue}/> 
                <Button floated='right' positive type='submit' content='Submit' loading = {submitting}/>
                <Button onClick={() => history.push('/activities')} floated='right' positive type='button' content='Cancel' loading = {submitting}/>                 
            </Form>
        </Segment>
    )
}
export default observer (ActivityForm);
