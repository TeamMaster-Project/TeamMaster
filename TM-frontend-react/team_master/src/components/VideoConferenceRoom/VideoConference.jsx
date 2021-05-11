import React, { Component } from 'react';
import { toast } from 'react-toastify';
import auth from "../../services/authService";
import PreLoader from '../PreLoader/PreLoader';

class JitsiComponent extends Component {

    domain = 'meet.jit.si';
    api = {};

    state = {
        projectId: '',
        projectName: '',
        user: {
            name: ''
        },
        isAudioMuted: false,
        isVideoMuted: false,
        isLoading: false
    }

    startMeet = async () => {
        const options = {
            roomName: this.state.projectName,
            width: '100%',
            height: 910,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            }
        }
        this.setState({isLoading: false})
        this.api = await new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
        toast("You are joined")
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "User Name1", formattedDisplayName: "User Name1" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "User Name", formattedDisplayName: "User Name (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        return this.props.history.push(`/thank-you`);
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command) {
        this.api.executeCommand(command);;
        if(command == 'hangup') {
            return this.props.history.push('/thank-you');
        }

        if(command == 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if(command == 'toggleVideo') {
            this.setState({ isVideoMuted: !this.state.isVideoMuted });
        }
    }

    async componentDidMount() {
        const projectId = await this.props.match.params.id;
        let projectName = await this.props.match.params.projectName
        const currentUser =  auth.getCurrentUser();
        if(projectId == 'new')
            projectName = "Instant Meeting"

        await this.setState({
            projectName: projectName,
            user: {
                name: currentUser.name
            },
        });

        
        
        if (window.JitsiMeetExternalAPI) {
            await this.setState({isLoading: true})
            await this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted } = this.state;
            return (
            <>
            <div id="jitsi-iframe" className=""></div>
            {/* <div class="item-center">
                <span>&nbsp;&nbsp;</span>
                <i onClick={ () => this.executeCommand('toggleAudio') } className={`fas fa-2x grey-color ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`} aria-hidden="true" title="Mute / Unmute"></i>
                <i onClick={ () => this.executeCommand('hangup') } className="fas fa-phone-slash fa-2x red-color" aria-hidden="true" title="Leave"></i>
                <i onClick={ () => this.executeCommand('toggleVideo') } className={`fas fa-2x grey-color ${isVideoMuted ? 'fa-video-slash' : 'fa-video'}`} aria-hidden="true" title="Start / Stop camera"></i>
                <i onClick={ () => this.executeCommand('toggleShareScreen') } className="fas fa-film fa-2x grey-color" aria-hidden="true" title="Share your screen"></i>
            </div> */}
            </>
            );       
    }
}

export default JitsiComponent;
