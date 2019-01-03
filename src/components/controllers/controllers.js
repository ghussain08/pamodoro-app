import React from 'react'
import play from './img/play.png'
import pause from './img/pause.png'
import reset from './img/reset.png'
import setting from './img/setting.png'
const controllers = (props) => {
    let icon;
    if (props.isRunning) {
        icon = <img onClick={props.toggleRunningStatus} src={pause} alt="pause icon" />
    }
    else {
        icon = <img onClick={props.toggleRunningStatus} src={play} alt="play icon" />
    }
    let modalStyle = null;
    if (props.isModalOpen) {
        modalStyle = {
            'opacity': 1
        }
    }

    return (
        <div className="controllers" >
            <div>
                {icon}
            </div>
            <div className="settingIconWrapper" >
                <img onClick={props.showModal} src={setting} alt='setting' />
                <div style={modalStyle} >
                    <label>Customize Timer</label>
                    <input required onBlur={props.customizeTimer} placeholder="05" type="number" name="number" max="25" min="05" />
                </div>
            </div>
            <div>
                <img onClick={props.reset} src={reset} alt="reset icon" />

            </div>
        </div>
    )
}
export default controllers;