import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {listRelated, singleBlog} from '../../actions/blog'
import { API, API_NAME, DOMAIN } from '../../config';
import router, { withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';
import RelatedCard from '../../components/blog/RelatedCard';

const SingleBlog = ({blog, router}) => {

    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                setRelated(data);
            }
        })
    }

    useEffect(() => {
        loadRelated();
    }, [])

    const head = () => (
        <Head>
            <title>{blog.title} | {API_NAME}</title>
            <meta name="description" content={blog.mdescription} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${router.pathname}`} />
            <meta property="og:title" content={`${blog.title} | ${API_NAME}`} />
            <meta name="og:description" content="nfjnsjnvdjsnjbdkawbjkjadbwk" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${router.pathname}`} />
            <meta property="og:site_name" content={`${API_NAME}`} />
            <meta property="og:image:secure_url" content={`${API}/blogs/photo/${blog.slug}`} />
            <meta property="og:image:type" content={"image/jpg"} />
            <meta property="fb:app_id" content={`${API_NAME}`} />
        </Head>
    )

    
    const showBlogCategories = blog => {
        return blog.categories.map((c,i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-warning mr-1 ml-1 mt-3"><strong>{c.name}</strong></a>
            </Link>
        ))
    }

    const showBlogTags = blog => {
        return blog.tags.map((t,i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-warning mr-1 ml-1 mt-3"><strong>{t.name}</strong></a>
            </Link>
        ))
    }

    const showRelatedBlog = () => {
        return related.map((r,i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <RelatedCard blog={r} />
                </article>
            </div>
        ))
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{marginTop: '-30px'}} >
                                    <img className="img img-fluid" style={{maxHeight: '700px', width: '100%'}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                                </div>
                            </section>
                            <section><br/>
                                <div className="container">
                                    <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h1>
                                    <p className="lead mt-3 mark">
                                        Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | {blog.updatedAt == null ? (<>Published on {moment(blog.createdAt).fromNow()}</>): (<>Published on {moment(blog.updatedAt).fromNow()}</>)}
                                    </p>
                                    <div className="pb-3">
                                        {showBlogCategories(blog)} {" "} || {" "} 
                                        {showBlogTags(blog)}<br/><br/>
                                    </div>
                                </div>
                            </section>
                            <div className="container">
                                <section>
                                    <div className="col-md-12 lead">
                                        {renderHTML(blog.body)}
                                    </div>
                                </section>
                            </div>
                            <div className="container pb-5">
                                <h4 className="text-center pt-5 pb-5 h2">Related Blogs</h4><hr/>
                                <div className="row">
                                    {showRelatedBlog()}
                                </div>
                            </div><hr/>
                            <div className="container pb-5">
                                <p>show comments</p>
                            </div>   
                            <div className="container pb-5">
                                <Link href="/blogs">
                                    <a className="btn btn-primary">
                                        Go Back
                                    </a>
                                </Link>    
                            </div>                     
                        </div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    )
}

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug).then(data => {
        if (data.error){
            console.log(data.error);
        }else {
            return {blog: data};
        }
    })
}


export default withRouter(SingleBlog)