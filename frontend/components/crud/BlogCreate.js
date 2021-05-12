import Link from "next/link";
import  Router from "next/router";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { withRouter } from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {list} from '../../actions/category';
import {listTags} from '../../actions/tag';
import { createBlog } from "../../actions/blog";
const Quill = dynamic(() => import('react-quill'), {ssr: true})
import '../../node_modules/react-quill/dist/quill.snow.css';


const BlogCreate = ({router}) => {
    return (
        <div>
            <h2>Create Blog form</h2>
            {/* {JSON.stringify(router.route)}             */}
        </div>
    )
}

export default withRouter(BlogCreate)
