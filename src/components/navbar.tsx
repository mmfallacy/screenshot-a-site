import React from 'react';
import '../App.scss';
import {Typography,TextField,Button} from '@material-ui/core'
import {CameraAlt} from '@material-ui/icons'

interface NavbarProps{
    updateUrl: Function
}

interface NavbarState{
    url: string
}
class Navbar extends React.Component <NavbarProps, NavbarState>{
    constructor(props: NavbarProps){
        super(props);
        this.state = {
            url: ''
        }
    }
    private handleChange = (e: any) => {
        this.setState({url:e.target.value})
    }
    private handleSubmit = (e: any) => {
        e.preventDefault()
        this.props.updateUrl(this.state.url)
    }
    public render(){
        return(
            <div className="navbar">
                <Typography variant="h2">
                    Screenshot-a-Site
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        id="urlInput"
                        label="Site URL"
                        value={this.state.url}
                        onChange={this.handleChange}
                        variant='outlined'
                        placeholder="https://www.google.com/"
                        required
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className = "submitButton"
                        endIcon={ <CameraAlt/> }
                    >
                        Screenshot!
                    </Button>
                </form>
            </div>
        );
    }
}

export default Navbar;