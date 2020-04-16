import React, { useState, FormEvent, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'
import {v4 as uuid} from 'uuid'
import ActivityStore from '../../../app/Stores/activityStore'
import { observer } from 'mobx-react-lite'

interface IProps{    
    activity: IActivity;    
}

export const ActivityForm:React.FC<IProps> = ({activity: initFormState}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, cancelEditForm} = activityStore;
    const initForm = () =>{
        if (initFormState){
            return initFormState;
        }

        return {
            id:'',
            title:'',
            category:'',
            description:'',
            date:'',
            city:'',
            venue:'',
        }
    }
    const [activity, setActivity] = useState<IActivity>(initForm);
    const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    }
    const handleSubmit = ()=> {
            if (activity.id.length === 0){
            let newActivity = {... activity, id: uuid()};
            createActivity(newActivity);
        }else{
            editActivity(activity);
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
                <Button onClick={() => cancelEditForm()} floated='right' positive type='button' content='Cancel' loading = {submitting}/>                 
            </Form>
        </Segment>
    )
}
export default observer (ActivityForm);
