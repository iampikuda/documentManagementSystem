import React, {Component}  from 'react'
import {toastr} from 'react-redux-toastr'

class notifications extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => toastr.success('The title', 'The message')}
          type="button">Toastr Success</button>
      </div>
    )
  }
}

export default notifications;