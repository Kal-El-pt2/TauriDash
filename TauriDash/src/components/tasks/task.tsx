import { purple } from '@mui/material/colors';
import { Checkbox } from '@mui/material';

function task() {
    return (
        <div className='container'>
            <div className='taskname'></div>
            <div className='time'></div>
            <div className='subtasks'></div>
            <div className='gethelp'>
                <img src='./aihelp.jpeg' alt='get-help'></img>
            </div>
            <div className='taskstatus'>
                <Checkbox
                    sx={{
                        color: purple[800],
                        '&.Mui-checked': {
                            color: purple[600],
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default task;
