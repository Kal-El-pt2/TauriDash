import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface SubtasksFieldProps {
  subtasks: string;
  setSubtasks: React.Dispatch<React.SetStateAction<string>>;
}

function SubtasksField({ subtasks, setSubtasks }: SubtasksFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = event.target.value.split('\n');
    const formattedText = lines.map((line, index) => {
      if (index === 0 && !line.startsWith('• ')) {
        return `• ${line}`;
      } else if (!line.startsWith('• ')) {
        return `• ${line}`;
      }
      return line;
    }).join('\n');
    setSubtasks(formattedText);
  };

  return (
    <TextareaAutosize
      minRows={1}
      style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      value={subtasks}
      onChange={handleChange}
      placeholder="Enter subtasks here..."
    />
  );
}

export default SubtasksField;
