import React from 'react';
import './App.scss';
import Navbar from './components/navbar'
import Screenshot from './services/screenshot'
import {CircularProgress,Button} from '@material-ui/core'
import {CloudDownload} from '@material-ui/icons'

interface AppProps{

}

interface AppState{
    result: string,
    error: boolean,
    loading: boolean
}

class App extends React.Component<AppProps, AppState>{
    constructor(props: any){
        super(props);
        this.state = {
            result : '',
            error: false,
            loading: false,
        }
    }
    updateUrl = (url:string) => {
        this.setState({loading:true}, ()=>{ 
            new Screenshot(url).capture().then(url=>{
                this.setState({result:url,error:false,loading:false})
            }).catch(err=>{
                this.setState({result:err,error:true,loading:false})
            })
        })
    }
    downloadResult = () => {
        var el = document.createElement('a')
        el.href = this.state.result
        el.download = "image.jpg"
        el.click()
    }
    render(){
        const navbarProps = {
            updateUrl: this.updateUrl
        }
        return (
            <div className="app">
                <Navbar {...navbarProps} />
                {   
                this.state.loading
                ?   
                    <div className="loading">
                        <CircularProgress size="3rem" className="loader"/>
                    </div>
                
                :   !this.state.error
                    ?   
                        this.state.result
                        ?
                            <div className="result">
                                <Button 
                                    color="primary"
                                    onClick = {this.downloadResult}
                                    variant="contained"
                                    className = "downloadButton"
                                    endIcon={ <CloudDownload/> }
                                >Download Image</Button>
                                <img src={this.state.result} alt="result"/>
                            </div>
                        : ''
                    :
                    alert(this.state.result)
                }
            </div>
        );
    }
}

export default App;
