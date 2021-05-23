import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog'

import Card from '../../components/blog/Card'
import { API_NAME, DOMAIN } from '../../config';
import { withRouter } from 'next/router';
import { useState } from 'react';


const Blogs = ({blogs, categories, tags, totalBlogs,blogSkip,blogsLimit, router}) => {

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(blogSkip);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs,setLoadedBlogs] = useState([]);

    const head = () => (
        <Head>
            <title>Programming blogs | {API_NAME}</title>
            <meta name="description" content="nfjnsjnvdjsnj" />
            <link rel="canonical" href={`${DOMAIN}/${router.pathname}`} />
            <meta property="og:title" content={`Latest web development content | ${API_NAME}`} />
            <meta name="og:description" content="nfjnsjnvdjsnjbdkawbjkjadbwk" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${API_NAME}`} />
            <meta property="og:image:secure_url" content={`${API_NAME}`} />
            <meta property="og:image:type" content={`${API_NAME}`} />
            <meta property="fb:app_id" content={`${API_NAME}`} />
        </Head>
    )

    // logic for pagination
    const loadMore = () => {
        let toSkip = skip+limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (<button onClick={loadMore} className='btn btn-primary btn-lg'>Load More</button>)
        )
    }

    const showAllLoadedBlogs = () => {
        return loadedBlogs.map((blog,i) => (
            <article key={i}>
                <Card blog={blog} />
            </article>
        ));
    }
   
    const showAllBlogs = () => {
        return blogs.map((blog,i) => (
            <>
             <article key={i}>
                <Card blog={blog} />
            </article>
          </>
        ))
    }

    const showAllCategories = () => {
        return categories.map((c,i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }

    const showAllTags = () => {
        return tags.map((t,i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-warning mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    }

    return (
            <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="font-weight-bold text-center">List of Tags and Categories</h1>
                                <section>
                                    <div className="pb-5 text-center">
                                        <strong>Category:</strong> {showAllCategories()}
                                        <br/>
                                        <strong>Tags:</strong> {showAllTags()}
                                    </div>
                                </section>
                            </div>
                        </header>
                    </div><hr/>
                    <div className="container-fluid">
                            
                                    <h1 className="font-weight-bold text-center">List of Blogs</h1><br/>
                            
                    </div>
                    <div className="conatiner-fluid">{showAllBlogs()}</div>
                    <div className="conatiner-fluid">{showAllLoadedBlogs()}</div>                
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>               
                        
                    
                </main>
            </Layout>
            </React.Fragment>
    )
}

Blogs.getInitialProps = () => {
    let skip=0;
    let limit=2;
    return listBlogsWithCategoriesAndTags(skip,limit).then(data => {
        if (data.error){
            console.log(data.error);
        }else{
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    })
}

export default withRouter(Blogs)