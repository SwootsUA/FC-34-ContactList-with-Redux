import {createTheme} from '@mui/material/styles';

const createAppTheme = (mode = 'dark') =>
    createTheme({
        palette: {
            mode,
            primary: {main: mode === 'dark' ? '#101010' : '#1976d2'},
            secondary: {main: mode === 'dark' ? '#808080' : '#6d6d6d'},
            background: {
                default: mode === 'dark' ? '#242424' : '#fafafa',
                paper: mode === 'dark' ? '#242424' : '#ffffff',
            },
            text: {
                primary:
                    mode === 'dark'
                        ? 'rgba(255,255,255,0.87)'
                        : 'rgba(0,0,0,0.87)',
            },
        },
        components: {
            MuiButton: {
                defaultProps: {size: 'large', variant: 'contained'},
                styleOverrides: {
                    root: {
                        height: '2.5em',
                        fontSize: '0.8em',
                        '&:hover': {
                            backgroundColor: '#646cff',
                        },
                    },
                },
            },
            MuiTextField: {
                defaultProps: {size: 'small', margin: 'dense'},
            },
        },
    });

export default createAppTheme;
