import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action';
import './Dashboard.scss';

class Dashboard extends Component {

    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);

    }

    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title:title,
            content:content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'SIMPAN'){
            saveNotes(data)
        }else{
            data.noteId = noteId
            this.props.updateNotes(data)
        }
        console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes = (note) => {
    console.log(note)
    this.setState({
        title: note.data.title,
        content: note.data.content,
        textButton: 'UPDATE',
        noteId: note.id
    })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    deleteNote = (e, note) =>{
        e.stopPropagation();
        const {deleteNote} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNote(data)
    }

    render ()
{
    const {title, content, textButton} = this.state;
    const {notes} = this.props;
    const {updateNotes} = this;
    const {cancelUpdate} = this;
    const {deleteNote} = this;
    console.log('notes: ', notes);
    return(
        <div className="container">
            <div className="input-form">
                <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e,'title')}/>
                <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e,'content')}>
                </textarea>
                <div className="action-wrapper">
                    {
                        textButton === "UPDATE" ? (
                            <button className="save-btn cancel" onClick={this.handleSaveNotes} onClick={cancelUpdate}>Cancel</button>
                        ):null
                    }
                    <div></div>
                <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                </div>
            </div>
            <p className="todo-text" >To Do List</p>
            <hr/>
            {
                notes.length > 0 ? (
                    <Fragment>
                        {
                            notes.map(note => {
                                return(
<div className="card-content" key={note.id} onClick={() => updateNotes(note)}>
                <p className="title">
                    {note.data.title}
                </p>
                <p className="content">
                {note.data.content}
                </p>
                <div className="delete-btn" onClick={(e) => deleteNote(e, note)}>X</div>
            </div>
                                )
                            })
                        }
                    </Fragment>
                
                ) : null
            }
            
        </div>
    )
}
}

const reduxState = (state) => ({
    userData: state.user,
    notes : state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    getNotes : (data) =>dispatch(getDataFromAPI(data)),
    updateNotes: (data) =>dispatch(updateDataAPI(data)),
    deleteNote: (data) =>dispatch(deleteDataAPI(data)),
    })

export default connect(reduxState, reduxDispatch) (Dashboard);