import Link from "next/link";
import  Router from "next/router";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { withRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {list} from '../../actions/category';
import {listTags} from '../../actions/tag';
import { createBlog } from "../../actions/blog";
const Quill = dynamic(() => import('react-quill'), {ssr: false})
import '../../node_modules/react-quill/dist/quill.snow.css';


const BlogCreate = ({router}) => {

    const [body,setBody] = useState({});
    const [values,setValues] = useState({
        title: '',
        sizeError:'',
        success:'',
        error:'',
        formData:'',
        hidePublishButton: false
    });

    const {error,success,formData,hidePublishButton,sizeError,title} = values;
    // const token = getCookie('token');

    const publishBlog = e => {
        e.preventDefault();
        console.log('ready to be published');
    }

    const handleChange = name =>e => {
        console.log(e.target.value);
    }

    
    const handleBody = e => {
        console.log(e);
    }

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group" noValidate>
                    <label className="text-muted">Title</label>
                    <br />
                    <textarea row="2" type="text" className="form-control" onChange={handleChange('title')} value={title} />
                </div>
                <div className="form-group" noValidate>
                    <label className="text-muted">Body</label>
                    <br />
                    {/* <textarea row="2" type="text" className="form-control" onChange={handleChange('title')} value={title} /> */}
                    <Quill value={body} placeholder="Type Something here..." onChange={handleBody} />
                </div>
            </form>
        )
    }

    return (
        <div>
            <h2>Create Blog form</h2>
            {/* {JSON.stringify(router.route)}             */}
            {createBlogForm()}
        </div>
    )
}

export default withRouter(BlogCreate)
