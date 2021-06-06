import Link from 'next/link';
import { API } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'

const Card = ({blog}) => {

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

    return (
        <>
        <div className="lead pb-4">
        <header>
            <Link href={`/blogs/${blog.slug}`}>
                <a style={{cursor: 'pointer'}}><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
            </Link>
        </header>
        <section>
            <p className="mark ml-1 pt-2 pb-2">
                Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link>  | {blog.updatedAt == null ? (<>Published on {moment(blog.createdAt).fromNow()}</>): (<>Published on {moment(blog.updatedAt).fromNow()}</>)}
            </p>
        </section>
        <section>
           {showBlogCategories(blog)}
           {showBlogTags(blog)}
        </section>
        <div className="row">
            <div className="col-md-4">
                <section>
                    <img className="img img-fluid img-rounded-z" style={{maxHeight: '250px', width:'auto'}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                </section>
            </div>
            <div className="col-md-8">
                <section>
                    <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="btn btn-primary pt-2">Read More</a>
                    </Link>
                </section>
            </div>
        </div>
        </div>
        </>
    )
}

export default Card