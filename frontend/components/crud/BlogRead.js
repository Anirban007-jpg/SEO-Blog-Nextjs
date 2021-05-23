import moment from "moment";
import Link from "next/link";
import  Router from "next/router";
import { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";

const BlogRead = () => {

    const [blogs,setBlogs] = useState([]);
    const [message,setMessage] = useState('');
    const [error,setError] = useState('');
    const token = getCookie('token')

    useEffect(() => {
        loadBlogs();
    }, [])

    const loadBlogs = () => {
        list().then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                setBlogs(data);
            }
        })
    }

    const deleteBlog = (slug) => {
        removeBlog(slug,token).then(data => {
            if (data.error){
                console.log(data.error);
            }
            else{
                setMessage(`${slug} Post Deleted Succesfully`)
                loadBlogs()
            }
        })
    }

    const showMessage = () => message ? <div className="alert alert-warning">{message}</div> : '';

    const deleteConfirm = (slug,blog) => {
        let answer = window.confirm('Are you sure you want to delete your blog');
        if (answer){
            deleteBlog(slug);
        }
    }

    const showUpdateButton = (blog) => {
        if (isAuth() && isAuth().role === 0){
            return (
                <Link href={`/user/createreadupdate/blog/${blog.slug}`}>
                    <a>Update</a>
                </Link>
            )
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-outline-warning">Update</a>
                </Link>
            )
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog,i) => (
            <div key={i} className="pb-5">
                <h3>{blog.title}</h3>
                <p className="mark">
                    Written by {blog.postedBy.name} | {blog.updatedAt === null ? (<>Published on {moment(blog.createdAt).fromNow()}</>):(<>Published on {moment(blog.updatedAt).fromNow()}</>)}
                </p>
                {isAuth() && isAuth().role === 1 && (
                    <button className="btn btn-danger btn-sm" onClick={() => deleteConfirm(blog.slug)}>Delete</button>
                )}
                {showUpdateButton(blog)}

            </div>
        ))
    }

    return (
        <React.Fragment>
                <div className="row">
                    {showMessage()}
                    <br/>
                    <div className="col-md-12">
                        {showAllBlogs()}
                    </div>
                </div>
        </React.Fragment>
    )
}

export default BlogRead
