import Link from "next/link";
import  Router from "next/router";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { withRouter } from "next/router";
import { isAuth, getCookie } from "../../../../actions/auth";
import {list} from '../../../../actions/category';
import {listTags} from '../../../../actions/tag';

const Quill = dynamic(() => import('react-quill'), {ssr: false})
import '../../../../node_modules/react-quill/dist/quill.snow.css';
import { createUserBlog } from "../../../../actions/blog";


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
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);

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
    const token = getCookie('token');

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
        // console.log('ready to be published');
        createUserBlog(formData, token).then(data => {
            if (data.error){
                setValues({...values,success:'',error:data.error})
            }else{
                setValues({...values, title:'',error:'',success:`A new blog with ${data.title} is created`});
                setBody('');
                setCategories([]);
                setTags([]);
            }
        })
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

    const handletoggle = (c) => () => {
        setValues({...values, error:'',success:''})
        // return the first index or -1
        const clickedCategory = checkedCat.indexOf(c);
        const all = [...checkedCat]
        
        if (clickedCategory === -1){
            all.push(c);
        }else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setCheckedCat(all);
        formData.set('categories', all);
    }

    const handletoggleTags = (t) => () => {
        setValues({...values, error:'',success:''})
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag]
        
        if (clickedTag === -1){
            all.push(t);
        }else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    }


    const showCategories = () => {
        return (
            categories && categories.map((c,i) => (
                <li className="list-unstyled" key={i}>
                    <input onChange={handletoggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    
    const showTags = () => {
        return (
            tags && tags.map((t,i) => (
                <li className="list-unstyled" key={i}>
                    <input onChange={handletoggleTags(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group" noValidate>
                   <textarea row="2" type="text" className="form-control" placeholder="Type your title here..." onChange={handleChange('title')} value={title} />
                </div>
                <div className="form-group" noValidate>
                    <Quill  value={body} modules={BlogCreate.modules} formats={BlogCreate.formats} placeholder="Type your content here..." onChange={handleBody} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Publish Blog</button>{" "}{" "}{" "}{" "}
                    <Link href="/user/index">
                        <a className="btn btn-outline-success">GO BACK</a>
                    </Link>
                </div>
            </form>
        )
    }



    const showError = () => error ? <div className="alert alert-danger">{error}</div> : '';
    const showMessage = () => success ? <div className="alert alert-success">{success}</div> : '';


    return (
        <div className="container-fluid pb-5">
            
            <div className="row">
                <div className="col-md-8" style={{borderRight: '1px solid black'}}>
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showMessage()}
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="form-group pb-2">
                        <h5>Featured Image</h5>
                        <hr/>
                        <small className="text-muted">Max size: 1Mb</small><br/>
                        <label className="btn btn-outline-info">Upload Featured Image
                            <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                        </label> 
                    </div>
                    <hr/>
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
                    <div>
                        {isAuth() && isAuth().role === 1 && isAuth().role === 2 ? (
                            <>
                                <h5>Create Category & Tag</h5>
                                <Link href="/admin/crud/category-tag">
                                    <a>
                                        Manage Category and Tags 
                                    </a>
                                </Link>
                            </>
                        ):(
                            <>
                                <h5>Create Category & Tag</h5>
                                <p>You have no authorization to craeate categories or tags</p>
                            </>
                        )}
                        
                    </div>

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
