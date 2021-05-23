import Link from "next/link";
import  Router from "next/router";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { withRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {list} from '../../actions/category';
import {listTags} from '../../actions/tag';
import { createBlog, singleBlog, updateBlog } from "../../actions/blog";
const Quill = dynamic(() => import('react-quill'), {ssr: false})
import '../../node_modules/react-quill/dist/quill.snow.css';
import { API, DOMAIN } from "../../config";

const BlogUpdate = ({router}) => {

    const [blog,setBlog] = useState([]);
    const [body,setBody] = useState('');
    const [categories,setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checkedCat, setCheckedCat] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);
    const [values,setValues] = useState({
        title: '',
        success:'',
        error:'',
        loading: false
    });

    const {error, success, formData, title,loading} = values;

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initBlog();
        initCatgeories();
        initTags();
    }, [router])

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

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error){
                    console.log(data.error);
                }else {
                    setBlog(data);
                    setValues({...values, title:data.title});
                    setBody(data.body);
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            })
        }
    }

    const setCategoriesArray = (blogCategories) => {
        let ca = [];
        blogCategories.map((c,i) => {
            ca.push(c._id);
            // console.log(ca)
            
        })  
        setCheckedCat(ca); 
        // console.log(ca);
    }

    const setTagsArray = (blogTags) => {
        let ta = [];
        blogTags.map((t,i) => {
            ta.push(t._id);
            
        })  
        setCheckedTag(ta); 
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e);
    }

    const token = getCookie('token');

    const editBlog = e => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', success: `Blog titled "${data.title}" is successfully updated` });
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin/crud/${router.query.slug}`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };

    const handleChange = name =>e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name] : value, formData, error: '', success:''});
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

    const findOutCat = (c) => {
        const result = checkedCat.indexOf(c);
        // console.log(checkedCat.indexOf());
        if (result !== -1){
            return true
        }else {
            return false
        }
    }

    const findOutTag = (t) => {
        const result = checkedTag.indexOf(t);
        if (result !== -1){
            return true
        }else {
            return false
        }
    }


    const showError = () => error ? <div className="alert alert-danger">{error}</div> : '';
    const showMessage = () => success ? <div className="alert alert-success">{success}</div> : '';

    const showCategories = () => {
        return (
            categories && categories.map((c,i) => (
                <li className="list-unstyled" key={i}>
                    <input onChange={handletoggle(c._id)} checked={findOutCat(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    
    const showTags = () => {
        return (
            tags && tags.map((t,i) => (
                <li className="list-unstyled" key={i}>
                    <input onChange={handletoggleTags(t._id)} checked={findOutTag(t._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group" noValidate>
                   <textarea row="2" type="text" className="form-control" placeholder="Type your title here..." onChange={handleChange('title')} value={title} />
                </div>
                <div className="form-group" noValidate>
                    <Quill  value={body} modules={BlogUpdate.modules} formats={BlogUpdate.formats} placeholder="Type your content here..." onChange={handleBody} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Update Published Blog</button>{" "}{" "}{" "}{" "}
                    <Link href="/admin/crud/blogs">
                        <a className="btn btn-outline-success">GO BACK</a>
                    </Link>
                </div>
            </form>
        )
    }

    const imageURl =  `${API}/blog/photo/${blog.slug}`;
    // const imageUrlload = () => {
    //     if (imageURl){
    //         setValues({...values,loading:true});
    //     }
    // }
    
    return (
        <div className="container-fluid pb-5">
            
            <div className="row">
                <div className="col-md-8" style={{borderRight: '1px solid black'}}>
                    {updateBlogForm()}
                    <div className="pt-3">
                        <p>show success and error</p>
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
                        <h5>Newly selected image</h5>
                            <img src="" />
                        <hr/>
                        <h5>Available Image</h5>
                        {imageURl === null ? (<h4>Loading...</h4>) : (<img classname="img img-fluid img-rounded-z" style={{maxHeight: '250px', width:'auto'}} src={imageURl} alt={blog.title} />)}               
                        <hr/>
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
                        {isAuth() && isAuth().role === 1 ? (
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
                                <p>You have no authorization to access this page</p>
                            </>
                        )}
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

BlogUpdate.modules = {
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
 
BlogUpdate.formats = [
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

export default withRouter(BlogUpdate)
