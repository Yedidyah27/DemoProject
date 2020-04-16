import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/Stores/activityStore'
import { observer } from 'mobx-react-lite'

interface IProps{    
    
}

export const ActivityDetails:React.FC<IProps> = () => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity : activity, openEditForm, cancelSelectedActivity} = activityStore;
    return (
        <Card>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity!.title}</Card.Header>
            <Card.Meta>
                <span>{activity!.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity!.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button 
                        onClick={() => openEditForm(activity!.id)}
                        basic color='blue' 
                        content='Edit'/>
                    <Button 
                        onClick={() => cancelSelectedActivity()}
                        basic color='blue' 
                        content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer (ActivityDetails);
