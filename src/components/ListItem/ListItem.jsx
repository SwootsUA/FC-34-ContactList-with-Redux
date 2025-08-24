import {memo} from 'react';
import {useDispatch} from 'react-redux';
import MuiListItem from '@mui/material/ListItem';
import {IconButton, ListItemText} from '@mui/material';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import {setCurrentContactId} from '../../store/slices/currentContactSlice';
import './ListItem.css';

function ListItem({selected, contact, deleteContact}) {
    const dispatch = useDispatch();

    return (
        <MuiListItem
            className={selected ? 'active' : ''}
            onDoubleClick={() => dispatch(setCurrentContactId(contact.id))}
            sx={{margin: '10px 0 12px 0', height: '40px'}}
            secondaryAction={
                <IconButton
                    type="button"
                    onClick={() => deleteContact(contact.id)}
                    edge="end"
                    color="secondary"
                    sx={{'&:focus': {outline: '0'}}}
                >
                    <DisabledByDefaultRoundedIcon />
                </IconButton>
            }
        >
            <ListItemText
                primary={`${contact.firstName} ${contact.lastName}`}
            />
        </MuiListItem>
    );
}

export default memo(ListItem);
