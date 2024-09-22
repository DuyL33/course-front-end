import Slider from '@mui/material/Slider';

const getDifficultyColor = (value) => {
    // Define color ranges based on difficulty values
    if (value < 2) return '#4CAF50'; // Green
    if (value < 3) return '#8BC34A'; // Light Green
    if (value < 4) return '#FFEB3B'; // Yellow
    if (value < 5) return '#FF9800'; // Orange
    return '#F44336'; // Red
};

const CustomSlider = ({ value, onChange }) => {
    const color = getDifficultyColor(value);

    return (
        <Slider
            value={value}
            onChange={onChange}
            aria-label="Difficulty"
            defaultValue={1}
            valueLabelDisplay="auto"
            shiftstep={1}
            step={1}
            marks
            min={1}
            max={5}
            sx={{
                color: color, // Track color
                '& .MuiSlider-thumb': {
                    backgroundColor: color, // Thumb color
                    border: `2px solid ${color}`,
                },
                '& .MuiSlider-rail': {
                    color: '#e0e0e0', // Rail color (default or a lighter version)
                },
                '& .MuiSlider-track': {
                    color: color, // Track color
                },
            }}
        />
    );
};

export default CustomSlider;
