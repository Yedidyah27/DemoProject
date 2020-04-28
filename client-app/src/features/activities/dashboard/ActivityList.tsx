import React, { useContext, Fragment } from 'react'
import { Item, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../app/Stores/activityStore'
import ActivityListItem from './ActivityListItem'

interface IProps{

}

export const ActivityList:React.FC<IProps> = () => {
    const activityStore = useContext(ActivityStore);
     const {activitiesByDate} = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) =>(
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                        <Item.Group divided>
                            {activities.map(act =>(
                                <ActivityListItem key={act.id} act={act} />
                            ))}                  
                        </Item.Group>                    
                </Fragment>                  
            ))}
        </Fragment>             
    )
}

export default observer (ActivityList);
