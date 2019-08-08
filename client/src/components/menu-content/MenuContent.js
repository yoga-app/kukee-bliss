import React, { Component } from 'react'

import './menucontent.css'

class MenuContent extends Component {
  constructor(props) {
    super(props)

    this.items = []
    for (let i=1; i<=5; i++) {
      this.items.push(i)
    }
  }

  render() {
    return (
      <div className="menu">
        {this.items.map(i => <div className="menu-item" key={i}>
          <a
            href="https://github.com/arstrel"
            onClick={this.props.closeCallback}
            target="_blank">
            Menu item {i}
          </a>
        </div>)}

        <p className="hint">Click outside the menu to close it, or swipe it closed on touch device</p>
      </div>
    )
  }
}


export default MenuContent
