// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const appointment = {
      id: uuidv4(),
      title,
      date,
      isStared: false,
    }
    if (title !== '' && date !== '') {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, appointment],
        title: '',
        date: '',
      }))
    }
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStared = () => {
    const {appointmentList} = this.state
    const filteredAppointmentList = appointmentList.filter(
      eachAppointment => eachAppointment.isStared === true,
    )
    this.setState({
      appointmentList: filteredAppointmentList,
    })
  }

  render() {
    const {appointmentList, title, date} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-section">
            <form onSubmit={this.onAddAppointment} className="input-section">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="text" className="label">
                Title
              </label>
              <input
                id="text"
                type="text"
                value={title}
                placeholder="Title"
                onChange={this.onChangeTitle}
                className="input"
              />
              <br />
              <label htmlFor="date" className="label">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
                className="input"
              />
              <br />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="img"
              />
            </div>
          </div>
          <hr className="line" />
          <div>
            <div className="head-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className="started-button"
                onClick={this.onClickStared}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointment={eachAppointment}
                  key={eachAppointment.id}
                  onToggleStar={this.onToggleStar}
                  formatDate={format}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
