import '../../App.css';
import '../../style.css';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import '@fortawesome/fontawesome-free/js/all.js';
import Action from '../../actions'
import { connect } from 'react-redux';
import EditTask from './editTask';
import loader from '../../spinner.gif'

function App(props) {
    const {bucket, task, isLoading, status, message} = props;
  const [td, setTd] = useState('')
  const [lable, setLable] = useState('')
  const [newLable, setNewLable] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const {register, handleSubmit} = useForm()

  useEffect(()=>{
    props.taskAction({type:'fetch'})
  },[])

  const submitData = (data) => {
    const c = [...task]
    const checkIfAlreadyPresent = c.filter(v => v.name === data.name)

    if (checkIfAlreadyPresent && checkIfAlreadyPresent.length<=0){
      setTd('')
      let r = {name:data.name, complete:false, bucket:'', type:'add'}
      if (data['new-bucket']) r = {...r, bucket:data['new-bucket']}
      if (data['bucket-type'] !== '5') r = {...r, bucket:data['bucket-type']}
      props.taskAction(r)
    }else{
      setError(true)
    }
  }

  const markComplete = (i, complete, name, bucket) => {
    props.taskAction({type:'update', id:i, complete, name, bucket})

    if (error) setError(false)
  }

  const deleteToDo = (i) => {
    props.taskAction({type:'delete', task:i})
    if (error) setError(false)
  }

  const getClass = (v) => {
    if (v) return "to-do-list-text-complete"
    return "to-do-list-text"
  }

  const valChange = (e) => {
    setTd(e.target.value)
    if (error) setError(false)
  }

  const changeLable = (e) => {
    if (e.target.value !== lable){
        setLable(e.target.value)
        if (e.target.value !== 'new-lable') setNewLable('')
    }
    if (error) setError(false)
  }

  const createNewBucket = (e) => {
    setNewLable(e.target.value)
    if (error) setError(false)
  }

  return (
    <div className="App">
      <div className="to-do-container">
        <form onSubmit={handleSubmit(submitData)}>
          <div >
            <div className="use-form">
            <input className="input-to-do" placeholder="Add To Do" onChange={valChange} ref={register} name='name' value={td} />
              <select name='bucket-type' ref={register} className="bucket-selector" onChange={changeLable}>
                {bucket.map((v,i) => 
                  <option key={i} value={v.id}>
                    {v.name}
                  </option>
                )}
              </select>
            </div>
            {lable === '5'?
            <div><input name='new-bucket' ref={register} className='create-new-bucket' onChange={createNewBucket}  placeholder='Create New Bucket'/></div>
            :
            <></>
            }
            <button className="input-button" type="submit">Submit</button>
          </div>
        </form>
        {error ?
        <div className='error-wrapper'>
          <span>This To Do is already added!</span>
        </div>
          :
          <></>}

        {!status ?
        <div className='error-wrapper'>
          <span>{message}</span>
        </div>
          :
          <></>}

            <div className='icon-desc'>
              <div className='icon-style-each'>
                <i className="fa fa-check ml-10" aria-hidden="true"></i>
                <span>Mark complete To Do/ Remove from complete</span>
              </div>
              <div className='icon-style-each'>
                <i className="fas fa-trash-alt ml-10"></i>
                <span>Delete To Do</span>
              </div>
            </div>

        <div className="to-do-list-container">
          <h4>To Do List</h4>
          <div className="to-do-list-wrapper">
            {task.map((val, ind) =>
            <div key={ind} className='to-do-list'>
              <div className={getClass(val.complete)}>{val.name}</div>
              <div onClick={() => setOpen(val)} className='icon-style'>
                <i className="fas fa-edit"></i>
              </div>
              <div onClick={() => markComplete(val.id, !val.complete, val.name, val.bucket)} className='icon-style'>
                <i className="fa fa-check" aria-hidden="true"></i>
              </div>
              <div onClick={() => deleteToDo(val.id)} className='icon-style'>
                <i className="fas fa-trash-alt"></i>
              </div>
            </div>
            )}
            {task.length<=0 && <div>You have no To Do. Add some to find it here. </div>}
          </div>
        </div>
      </div>
      {open && <EditTask {...open} open={open ? true : false} setOpen={setOpen}  /> }
      {isLoading && 
      <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <img src={loader} style={{margin:'30%'}} />
      </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        task: state.task.task,
        isLoading: state.task.isLoading,
        status: state.task.status,
        message: state.task.message,
        bucket: state.task.bucket
    }
}

const mapDispatchToProps = {
    ...Action
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
