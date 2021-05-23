import Link from 'next/link';
import { API } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'

const RelatedCard = ({blog}) => {
    return (
        <React.Fragment>
            <div className="card">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                        <img className="img img-fluid img-rounded-z" style={{maxHeight: '250px', width:'100%'}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                        </a>
                    </Link>
                </section>
                <div className="card-body">
                    <section>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="card-title">{blog.title}</a>
                        </Link>
                        <p className="card-text">{renderHTML(blog.excerpt)}</p>
                    </section>
                </div>
                <div className="card-body">
                    <section>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="mark ml-1 pt-2 pb-2">
                                Written by {blog.postedBy.username} | {blog.updatedAt == null ? (<>Published on {moment(blog.createdAt).fromNow()}</>): (<>Published on {moment(blog.updatedAt).fromNow()}</>)}
                            </a>
                        </Link>
                    </section>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RelatedCard
