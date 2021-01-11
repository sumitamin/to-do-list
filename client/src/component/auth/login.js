import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Action from '../../actions'
import {connect} from 'react-redux'
import { withRouter } from "react-router";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop:50,
      padding:20,
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    loginHeader:{
        textAlign:'center'
    },
    signUp:{
      cursor: 'pointer',
      textAlign:'center'
    },
    fieldWrapper:{
      margin:"10px 0"
    },
    buttonWrapper:{display:'flex', justifyContent:'flex-end', margin:"10px 0"}
  });

const Login = (props) => {
  const {message, status, isLoading} = props.task
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();

    const formSubmit = (e) => {
      e.preventDefault()
      props.logIn({email,password})
    }
  
    const goToSignUp = () => {
      // props.location.push('/signup')
      // console.log(props.location)
      props.clearAction()
      window.location.href='/signup'
    }

    return (
        <Container maxWidth="sm">
          <Card className={classes.root} >
            <h1 className={classes.loginHeader}> Login </h1>
              <CardContent>
                <form onSubmit={formSubmit} autoComplete="off">
                  <div className={classes.fieldWrapper} >
                    <TextField id="email" label="Email Id" onChange={(e) => setEmail(e.target.value)} paceholder="Enter Email id" name="email" type="email" required/>
                  </div>
                  <div className={classes.fieldWrapper} >
                    <TextField id="password" label="Password" onChange={(e) => setPassword(e.target.value)} paceholder="Enter Password" name="password" type="text" required/>
                  </div>
                  <div className={classes.buttonWrapper} >
                    { isLoading ?
                    <CircularProgress />
                    :
                    <Button type="submit" variant="contained" color="primary">LOGIN</Button>
                    }
                  </div>
                </form>
              </CardContent>
              { !status &&
              <div className={classes.signUp}>
                <Alert severity="error">{message}</Alert>
              </div>
              }
            <div className={classes.signUp} onClick={goToSignUp}> 
              Don't have an account? Sign Up 
            </div>
          </Card>
        </Container>
    )
}

const mapDispatchToProps = {
  ...Action
}

const mapStateToProps = (state) => {
  return {
      task: state.task
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
