import React, { useEffect, Component, Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Adminsidebar from '../../components/Adminsidebar';
import AdminTopnav from '../../components/AdminTopnav';
import Adminfooter from '../../components/Adminfooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
function CreateLab(props) {
  //fetch the records from api and store in classes dropdown
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get_classes');
      const data = await response.json();
      setClasses(data.data); // Assuming the API returns an array of class details
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  // useEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchClasses();
  }, []);
  //create a form post request to add class, name and code to the database table
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    course: '',
    description: '',
    io_format: '',
    constraints: '',
    io_sample: '',
    psuedo_code: '',
    template1: '', // State for Template 1 AceEditor
    template2: '', // State for Template 2 AceEditor
    data_harness_code: '', // State for Data Harness Code AceEditor
    testcases: '', // State for the textarea
  });

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/add_lab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers if needed, like authorization headers
        },
        body: JSON.stringify(formData)
      });
console.log(formData)
      const data = await response.json();
      // Handle response data
      if (data.success) {
        // Reset the form if submission was successful
        setFormData({
          name: '',
          code: '',
          course: '',
          description: '',
          io_format: '',
          constraints: '',
          io_sample: '',
          psuedo_code: '',
          template1: '', // State for Template 1 AceEditor
          template2: '', // State for Template 2 AceEditor
          data_harness_code: '', // State for Data Harness Code AceEditor
          testcases: '', // State for the textarea
        });

        // Display a success toast notification
        toast.success(data.message || 'Lab added successfully!');
      } else {
        // Handle the case where the server did not return a success response
        toast.error('Failed to add lab');
      }
      // Handle response data
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const handleEditorChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <>
      <ToastContainer />
      <div id="wrapper">

        <Adminsidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <AdminTopnav />
            <div className="container px-3 py-4">
              <div className="row">
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                  <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                    <form method="POST" onSubmit={handleSubmit} enctype="multipart/form-data" autocomplete="OFF">
                      <div className="row">
                        <div className=" col-sm-12">
                          <div className="card-box">
                            <div className="row">
                              <div className="col-md-12 col-sm-12">
                                <div className="form-group mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                        <label className="mont-font fw-600 font-xsss">Select Class</label><br />
                                        <select name="course" id="course" className="form-control" onChange={handleInputChange}>
                                          <option readonly disabled selected value="">-Select-</option>
                                          {classes.map((classDetail) => (
                                            <option key={classDetail.id} value={classDetail.id}>
                                              {classDetail.id}
                                            </option>
                                          ))}
                                        </select>

                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Code</label>
                            <input
                              type="text"
                              name="code"
                              value={formData.code}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter Code"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Description</label>
                            <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter description"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">I/O Format</label>
                            <input
                              type="text"
                              name="io_format"
                              value={formData.io_format}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter io_format"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Constraints</label>
                            <input
                              type="text"
                              name="constraints"
                              value={formData.constraints}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter constraints"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Sample I/O</label>
                            <input
                              type="text"
                              name="io_sample"
                              value={formData.io_sample}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter io_sample"
                            />
                          </div>
                        </div>
                     
                    
                        <div className="form-group col-lg-6">
                        <label className="mont-font fw-600 font-xsss">Psuedo Code</label>

              <AceEditor
          mode="java"
          theme="github"
          name="psuedo_code"
          editorProps={{ $blockScrolling: true }}
          value={formData.psuedo_code}
          onChange={(value) => handleEditorChange('psuedo_code', value)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>




<div className="form-group col-lg-6">
              <label className="mont-font fw-600 font-xsss">Template 1(Easy)</label>
              <AceEditor
          mode="java"
          theme="github"
          name="template1"
          editorProps={{ $blockScrolling: true }}
          value={formData.template1}
          onChange={(value) => handleEditorChange('template1', value)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
<div className="form-group col-lg-6">
              <label className="mont-font fw-600 font-xsss">Template 2 (Medium)</label>
              <AceEditor
          mode="java"
          theme="github"
          name="template2"
          editorProps={{ $blockScrolling: true }}
          value={formData.template2}
          onChange={(value) => handleEditorChange('template2', value)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
<div className="form-group col-lg-6">
              <label className="mont-font fw-600 font-xsss">Data Harness Code</label>
              <AceEditor
          mode="java"
          theme="github"
          name="data_harness_code"
          editorProps={{ $blockScrolling: true }}
          value={formData.data_harness_code}
          onChange={(value) => handleEditorChange('data_harness_code', value)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>


      <div className="form-group col-lg-12">
        <label className="mont-font fw-600 font-xsss">Testcases</label>
        <br/>
        <textarea
          name="testcases"
          value={formData.testcases}
          onChange={handleInputChange}
          placeholder="Paste your JSON here"
          rows={20}
          cols={100}
          className="border-black border-2"
        />
      </div>
            

                        <div className="col-lg-12">
                          <button type="submit" className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-0 float-right" >Procced</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Adminfooter />
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateLab;