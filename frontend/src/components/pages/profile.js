import {Component} from "react";

class Profile extends Component {

    render() {
        return(
            <div className="left-side">
                <div className="profile-side" style={{visibility: "visible"}}>
                    <div className="std-info">
                        <img src={this.props.user.profilePic} alt="profile"
                             className="profile-pic"/>
                            <div className="std-sub">
                                <p className="level"><b>Level {this.props.user.level}</b></p>
                                <p className="player-name">{this.props.user.name}</p>
                            </div>
                    </div>
                    <div className="more-info">
                        <div className="sub-navbar">
                            <p className="stats">STATISTICS</p>
                            <p className="hist">HISTORY</p>
                            <p className="sett">SETTINGS</p>
                            <p className="aff">AFFILIATES</p>
                            <p className="trans">TRANSACTIONS</p>
                        </div>
                        <div className="content">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile