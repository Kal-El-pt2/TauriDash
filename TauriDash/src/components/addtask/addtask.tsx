import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import SubtasksField from '../SubtasksField';

function AddTask() {
    const [taskName, setTaskName] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [subtasks, setSubtasks] = useState<string>("");

    const handleAddTask = async () => {
        try {
            const formattedDate = date ? date.format('YYYY-MM-DD') : '';

            const taskLogId = await invoke<number>('add_task', { taskName, date: formattedDate });

            await invoke('add_task_details', {
                taskDetails: {
                    task_log_id: taskLogId,
                    subtask_name: subtasks,
                    status: false, // Set status to false for all tasks initially
                    time: new Date().toLocaleTimeString(),
                }
            });

            alert("Task added successfully!");
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    return (
        <div className="container">
            <div>
                <input
                    type='text'
                    placeholder='Task name?'
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Select Date"
                        inputFormat="YYYY-MM-DD"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        // Use the `textField` slot instead of `renderInput`
                        slots={{ textField: (params) => <TextField {...params} /> }}
                    />
                </LocalizationProvider>
            </div>
            <div>
                {/* Pass the subtasks and setSubtasks as props */}
                <SubtasksField subtasks={subtasks} setSubtasks={setSubtasks} />
            </div>
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default AddTask;
