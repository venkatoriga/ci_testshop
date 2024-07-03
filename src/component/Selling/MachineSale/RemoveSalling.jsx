import React,{useState} from 'react';
import RemoveMachineModal from "../Modals/RemoveMachineModal"
import "./RemoveSalling.css"
import ScheduleModal from '../Modals/ScheduleModal';
import UserModal from '../Modals/UserModal';
import MachineLocationModal from '../Modals/MachineLocationModal';

const RemoveSalling = () => {
    const [showModal, setShowModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showUserModal, setShowUserModel] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const scheduleModalAction = (status) => {
        setShowScheduleModal(status);
    };
    const userModalAction = (status) => {
        setShowUserModel(status);
        setShowScheduleModal(false);
    };
    const locationModalAction = (status) => {
        setShowLocationModal(status);
        setShowScheduleModal(false);
        setShowUserModel(false);
    };   
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
            document.body.classList.add('no-overflow');
        }else{
            setShowModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
  return (
        <>
            {showModal && (<RemoveMachineModal modalAction={handleModal}/>)}
            {showScheduleModal ? (<ScheduleModal modalAction={scheduleModalAction} setShowUserModel={setShowUserModel} />) : null }
            {showUserModal ? (<UserModal modalAction={userModalAction}  setShowLocationModal={setShowLocationModal}/>) :null}
            {showLocationModal ? (<MachineLocationModal modalAction={locationModalAction} setShowLocationModal={setShowLocationModal} machineSell="false"/>) :null}
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="remove-box-wrap">
                        <div className="box-item">
                            <div className="inner remove-req">
                                <div className="heading-400-14-12 light-txt">Wish to remove your selling request from Origa?</div>
                                <button className="box-btn heading-600-14 heading-600-14-12" onClick={() => handleModal(true)}>Remove Request</button>
                            </div>
                        </div>
                        <div className="box-item-1">
                            <div className="inner-1">
                                <div className="schedule-heading heading-400-14-12">Schedule your free Inspection</div>
                                <div className="text heading-500-16">Our qualified team will come to inspect your machine and help enlist your machine on Origa so you can find the best deal for your machine</div>
                                <button type='button' className='schdule-btn heading-400-16-12' onClick={() => setShowScheduleModal(true)}>Schedule now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default RemoveSalling