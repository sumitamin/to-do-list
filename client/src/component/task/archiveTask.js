import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Action from '../../actions'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

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

const Task = (props) => {
    const {task, status, message} = props.task
    const classes = useStyles();
    
    useEffect(() => {
        props.taskAction({type:'fetch', isArchive:true})
    }, [])

    return (
        <Container maxWidth="sm">
            <Grid container spacing={3} style={{marginBottom:20, marginTop:20}} >

                { !status &&
                <div className={classes.signUp}>
                    <Alert severity="error">{message}</Alert>
                </div>
                }

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task List</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {task.map((val, i) =>
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">{val.task}</TableCell>
                                        <TableCell component="th" scope="row" align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>props.taskAction({task: val._id, isArchive:false, type:'archive'})}
                                            >
                                                Unarchive
                                            </Button>
                                            
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        task: state.task
    }
}

const mapDispatchToProps = {
    ...Action
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);