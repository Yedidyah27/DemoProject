import React, { useContext } from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import ActivityStore from '../../../app/Stores/activityStore'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../models/activity'
import { observer } from 'mobx-react-lite'
import {format} from 'date-fns'

export const ActivityListItem : React.FC<{act: IActivity}> = ({act}) => {
    const activityStore = useContext(ActivityStore);
    const {target, submitting} = activityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                <Item>
                    <Item.Image size='tiny' src='/assets/user.png'/>
                    <Item.Content>
                        <Item.Header as='a'>{act.title}</Item.Header>
                        <Item.Description>
                            Hosted by Jed
                        </Item.Description>
                    </Item.Content>
                </Item>
                </Item.Group>                
            </Segment>
            <Segment>
                <Icon name='clock' />{format(act.date, 'h:mm a')}
                <Icon name='marker' />{act.venue}, {act.city}
            </Segment>
            <Segment secondary>
                Atendee will go here
            </Segment>
            <Segment clearing>
                <span>{act.description}</span>
                <Button as={Link} to= {`/activity/${act.id}`}
                                    loading = {target === `${act.id}Submit` && submitting}
                                    name={`${act.id}Submit`}
                                    floated='right' 
                                    content='View' 
                                    color='blue'/>
            </Segment>
        </Segment.Group>

    )
}
export default observer (ActivityListItem);
