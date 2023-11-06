import React, { useState, useEffect, useRef } from 'react';
import Appfooter from '../../components/Appfooter';
import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Profile from '../../components/Profile';
import Myclass from '../../components/Myclass';
import Subscribe from '../../components/Subscribe';

import { Tabs, Tab } from 'react-bootstrap';



import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoPlayer from './VideoPlayer';
import { useParams } from 'react-router-dom';

function SubjectStream() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    let { subjectId } = useParams();
    const userString = sessionStorage.getItem("rexkod_user");
    const user = JSON.parse(userString);
    const userId = user.user.id


    const chatContentRef = useRef(null);
    const noteContentRef = useRef(null);
    const [activeTab, setActiveTab] = useState("course");  //set course as the default active tab

    useEffect(() => {

        // to scrolldown in the chat and notes tab when component is loaded
        if (activeTab === "chat" || activeTab === "notes") {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
            noteContentRef.current.scrollTop = noteContentRef.current.scrollHeight;
        }

        subjectDetails();
    }, [activeTab]);


    // video player
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'https://abc.kods.app/uploads/SHGV1684912023.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        // player.on('waiting', () => {
        //     videojs.log('player is waiting');
        // });

        // player.on('dispose', () => {
        //     videojs.log('player will dispose');
        // });
    };

    const [allSubjectData, setAllSubjectData] = useState([]);
    function subjectDetails() {
        fetch(baseUrl + "api/subject_stream/" + userId + "/" + subjectId, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setAllSubjectData(resp);
            console.log(resp.assesments_given);

        });
    }
    useEffect(() => {
        subjectDetails();
    }, []);

    return (
        <>
            <div className="main-wrapper">
                <Navheader />

                <div className="main-content menu-active">
                    <Appheader />

                    <div className="middle-sidebar-bottom theme-dark-bg">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
                                    <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
                                </div>

                                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                                    <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                                        <Tabs
                                            defaultActiveKey="course"
                                            id="uncontrolled-tab-example"
                                            onSelect={(key) => setActiveTab(key)}
                                            className="mb-3 list-inline-center d-block text-center border-0"
                                        >
                                            <Tab eventKey="course" title="COURSE" className="list-inline-item">
                                                <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}>
                                                    <h1>tab1</h1>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="chat" title="CHAT" className="list-inline-item " >

                                                <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}
                                                    ref={chatContentRef}>
                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I'm fine, how are you
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">
                                                                    01:35 PM
                                                                    <i className="ti-double-check text-info"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I want those files for you. I want you to send 1 PDF
                                                            and 1 image file.
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I've found some cool photos for our travel app.
                                                        </div>
                                                    </div>

                                                    <div className="message-item outgoing-message">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5>You</h5>
                                                                <div className="time">
                                                                    01:35 PM
                                                                    <i className="ti-double-check text-info"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap">
                                                            Hey mate! How are things going ?
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I'm fine, how are you.
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">
                                                                    01:35 PM
                                                                    <i className="ti-double-check text-info"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I want those files for you. I want you to send 1 PDF
                                                            and 1 image file.
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I've found some cool photos for our travel app.
                                                        </div>
                                                    </div>
                                                </div>
                                                <form className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                                    <button className="bg-grey float-left">
                                                        <i className="ti-microphone text-white"></i>
                                                    </button>
                                                    <div className="form-group">
                                                        <input type="text" placeholder="Start typing.." />
                                                    </div>
                                                    <button className="bg-current">
                                                        <i className="ti-arrow-right text-white"></i>
                                                    </button>
                                                </form>
                                            </Tab>
                                            <Tab eventKey="notes" title="NOTES" className="list-inline-item">
                                                <div className="messages-content chat-wrapper scroll-bar p-3"
                                                    style={{ height: 400 }}
                                                    ref={noteContentRef}>
                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I'm fine, how are you
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">
                                                                    01:35 PM
                                                                    <i className="ti-double-check text-info"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I want those files for you. I want you to send 1 PDF
                                                            and 1 image file.
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I've found some cool photos for our travel app.
                                                        </div>
                                                    </div>

                                                    <div className="message-item outgoing-message">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5>You</h5>
                                                                <div className="time">
                                                                    01:35 PM
                                                                    <i className="ti-double-check text-info"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap">
                                                            Hey mate! How are things going ?
                                                        </div>
                                                    </div>

                                                    <div className="message-item">
                                                        <div className="message-user">
                                                            <figure className="avatar">
                                                                <img src="assets/images/user.png" alt="avater" />
                                                            </figure>
                                                            <div>
                                                                <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                                <div className="time">01:35 PM</div>
                                                            </div>
                                                        </div>
                                                        <div className="message-wrap shadow-none">
                                                            I'm fine, how are you.
                                                        </div>
                                                    </div>


                                                </div>
                                                <form className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                                    <button className="bg-grey float-left">
                                                        <i className="ti-microphone text-white"></i>
                                                    </button>
                                                    <div className="form-group">
                                                        <input type="text" placeholder="Start typing.." />
                                                    </div>
                                                    <button className="bg-current">
                                                        <i className="ti-arrow-right text-white"></i>
                                                    </button>
                                                </form>
                                            </Tab>


                                        </Tabs>


                                    </div>
                                </div>

                                <div className="col-xl-12 col-xxl-12">
                                    <div
                                        className="card d-block border-0 rounded-lg overflow-hidden dark-bg-transparent bg-transparent mt-4 pb-4">
                                        <div className="row">
                                            <div className="col-8">
                                                <h2 className="fw-700 font-md d-block lh-4 mb-2 title">
                                                    Video name</h2>
                                            </div>
                                            <div className="col-4 save-div">
                                                <a href="#"
                                                    className="btn-round-md ml-3 mb-2 d-inline-block float-right rounded-lg bg-danger"><i
                                                        className="feather-bookmark font-sm text-white"></i></a>
                                                <a href="#"
                                                    className="btn-round-md ml-0 d-inline-block float-right rounded-lg bg-greylight"
                                                    id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i className="feather-share-2 font-sm text-grey-700"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right p-3 border-0 shadow-xss"
                                                    aria-labelledby="dropdownMenu2">
                                                    <ul className="d-flex align-items-center mt-0 float-left">
                                                        <li className="mr-2">
                                                            <h4 className="fw-600 font-xss text-grey-900  mt-2 mr-3">Share: </h4>
                                                        </li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-facebook"><i
                                                                className="font-xs ti-facebook text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-twiiter"><i
                                                                className="font-xs ti-twitter-alt text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-linkedin"><i
                                                                className="font-xs ti-linkedin text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-instagram"><i
                                                                className="font-xs ti-instagram text-white"></i></a></li>
                                                        <li className="mr-2"><a href="#"
                                                            className="btn-round-md bg-pinterest"><i
                                                                className="font-xs ti-pinterest text-white"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <span className="font-xssss fw-700 text-grey-900 d-inline-block ml-0 text-dark">Teacher name</span>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 bg-lightblue" >

                                        <a href="#">
                                            <h2 className="fw-700 font-sm mt-1 pl-1">Test coming soon!. <i className="ti-arrow-right font-sm text-dark float-right"></i></h2>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-12 pt-2 mt-2">
                                    <h2 className="fw-400 font-lg d-block">Mini <b>Projetcs</b> <a href="#"
                                        className="float-right"><i className="feather-edit text-grey-500 font-xs"></i></a></h2>
                                    <div
                                        className="owl-carousel category-card owl-theme overflow-hidden overflow-visible-xl nav-none">
                                        {
                                            allSubjectData && allSubjectData.mini_projects ? (
                                                allSubjectData && allSubjectData.mini_projects.map((mini_project, id) => (
                                                    <div className="item">
                                                        <div
                                                            className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">

                                                            <div className="card-image w-100 ">
                                                                <img src={baseUrl+mini_project.project_image} alt="image"
                                                                    className="w-100" style={{height:100}}/>
                                                            </div>
                                                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">

                                                                <div className="clearfix"></div>
                                                                <h4 className="fw-700 font-xsss mt-3 mb-1"><a href="#"
                                                                    className="text-dark text-grey-900">
                                                                </a>{mini_project.project_name}</h4>
                                                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                                                                {mini_project.description}</p>
                                                                <a href="#"
                                                                    className="text-dark text-grey-900">
                                                                    <span
                                                                        className="live-tag mt-2 mb-3 bg-danger p-2 z-index-1 rounded-lg text-white font-xsssss text-uppersace fw-700 ls-3">Start</span></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                                :
                                                <div>No Mini Projects Available</div>
                                        }




                                    </div>
                                </div>
                                <div className="col-lg-12 pt-2 mt-2">
                                    <h2 className="fw-400 font-lg d-block">MY <b>Assesments</b> <a href="#"
                                        className="float-right"><i className="feather-edit text-grey-500 font-xs"></i></a></h2>
                                    <div
                                        className="owl-carousel category-card owl-theme overflow-hidden overflow-visible-xl nav-none">
                                        {
                                            allSubjectData && allSubjectData.assesments_given ? (
                                                allSubjectData && allSubjectData.assesments_given.map((assesment, id) => (
                                                    <div className="item" key={id}>
                                                        <div
                                                            className="card w200 d-block border-0 shadow-xss rounded-lg overflow-hidden mb-4">
                                                            <div className="card-body d-block w-100 pl-4 pr-4 pb-4 text-center">
                                                                <div className="clearfix"></div>
                                                                <h4 className="fw-700 font-xsss mt-3 mb-1"><a href="/view_assesment_results/{{$assesments_given->id}}"
                                                                    className="text-dark text-grey-900">{assesment.video_name}
                                                                </a></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                                :
                                                <div>No Assesments Available</div>
                                        }

                                    </div>
                                </div>
                                <div className="col-xl-12 col-xxl-12 col-lg-12">


                                    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4">
                                        <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">Description</h2>
                                        <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">
                                            description
                                        </p>
                                    </div>

                                    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 mb-5">
                                        <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 mb-3">Instructor</h2>
                                        <div className="row">
                                            <div className="col-sm-4 col-lg-4">
                                                <div>
                                                    <img src="/assets/images/manjunath.jpeg"
                                                        alt="Author Images" width={300} />

                                                </div>
                                            </div>
                                            <div className="col-sm-8 col-lg-8">
                                                <div className="author-content">
                                                    <h3 className="title">Manjunath Aradhya</h3>
                                                    <span className="subtitle">Senior Instructor</span>
                                                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">A passionate
                                                        Tech-Guru, a revered author of numerous hot-selling Computer Science
                                                        books, a renowned Educationist, and a celebrated Technocrat. A former
                                                        Business-Associate at Wipro Technologies and organically connected to
                                                        the academia all through my 24+ years of Journey in Tech-skilling, I
                                                        have been impact-fully instrumental in personally transforming 60000+
                                                        On-campus & Off-campus Tech-graduates to successful IT-Professionals.
                                                    </p>
                                                    <p className="font-xssss fw-500 lh-28 text-grey-600 mb-0 pl-2">After creating
                                                        more than a dozen courses on Microsoft Access databases and programming
                                                        in VBA, many students have contacted me with discussions on specific
                                                        problems and scenarios. From these discussions,</p>
                                                    <ul className="social-share">
                                                        <li><a href="#"><i className="icon-facebook"></i></a></li>
                                                        <li><a href="#"><i className="icon-twitter"></i></a></li>
                                                        <li><a href="#"><i className="icon-linkedin2"></i></a></li>
                                                        <li><a href="#"><i className="icon-youtube"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="middle-sidebar-right scroll-bar">
                            <div className="middle-sidebar-right-content">
                                <Profile />
                                <Myclass />
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                </div>

                <Appfooter />
            </div>
        </>
    );
}


export default SubjectStream;
