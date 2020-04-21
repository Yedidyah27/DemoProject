import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/Stores/activityStore'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

interface IProps{
    
}
export const Navbar:React.FC<IProps> = () => {
    const activityStore = useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
        <Container>
            <Menu.Item header as={NavLink} exact to='/'>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities' as={NavLink} to='/activities'/>
            <Menu.Item>
                <Button onClick={activityStore.openCreateActivity} positive content="Create Activity" as={NavLink} to='/createActivity'></Button>
            </Menu.Item>
        </Container>
        
      </Menu>
    )
}

export default observer (Navbar);
