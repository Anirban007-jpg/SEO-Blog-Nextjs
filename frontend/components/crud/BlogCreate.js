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

    // grab the blog from localstorage

    const blogfromLS = () => {
        if (typeof window !== undefined){
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        }else{
            return false;
        }
    }

    const [categories,setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [body,setBody] = useState(blogfromLS());
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

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCatgeories();
        initTags();
    }, [router]);

    const initCatgeories = () => {
        list().then(data => {
            if (data.error){
                setValues({...values, error: data.error})
            }else{
                setCategories(data);
            }
        })
    }

    const initTags = () => {
        listTags().then(data => {
            if (data.error){
                setValues({...values, error: data.error})
            }else{
                setTags(data);
            }
        })
    }

    const publishBlog = e => {
        e.preventDefault();
        console.log('ready to be published');
    }

    const handleChange = name =>e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value, formData, error: '', success:''});
    }

    
    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== undefined){
            localStorage.setItem('blog', JSON.stringify(e));
        }
    }

    const showCategories = () => {
        return (
            categories && categories.map((c,i) => (
                <li className="list-unstyled" key={i}>
                    <input type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    
    const showTags = () => {
        return (
            tags && tags.map((t,i) => (
                <li className="list-unstyled" key={i}>
                    <input type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
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
                    <Quill value={body} modules={BlogCreate.modules} formats={BlogCreate.formats} placeholder="Type Something here..." onChange={handleBody} />
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                </div>
                <div className="col-md-4">
                    <div>
                        <h5>Categories</h5>
                        <hr/>
                        <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showCategories()}</ul>
                    </div>
                    <hr/>
                    <div>
                        <h5>Tags</h5>
                        <hr/>
                        <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>{showTags()}</ul>
                    </div>
                    <hr/>

                </div>
            </div>
        </div>
    )
}

BlogCreate.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogCreate)
