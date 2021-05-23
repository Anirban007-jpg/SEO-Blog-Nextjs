import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { API, API_NAME, DOMAIN } from '../../config';
import router, { withRouter } from 'next/router';
import moment from 'moment';
import { singleTag } from '../../actions/tag';
import renderHTML from 'react-render-html';
import Card from "../../components/blog/Card"

const Tag = ({tag, blogs}) => {

    const head = () => (
        <Head>
            <title>{tag.name} | {API_NAME}</title>
            <meta name="description" content={tag.name} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${router.pathname}`} />
            <meta property="og:title" content={`${tag.name} | ${API_NAME}`} />
            <meta name="og:description" content="nfjnsjnvdjsnjbdkawbjkjadbwk" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/tags/${router.pathname}`} />
            <meta property="og:site_name" content={`${API_NAME}`} />
            <meta property="og:image:secure_url" content={`${API}/tags/${tag.slug}`} />
            <meta property="og:image:type" content={"image/jpg"} />
            <meta property="fb:app_id" content={`${API_NAME}`} />
        </Head>
    )

    return (
        <React.Fragment>
            {head}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                                {blogs.map((b,i) => (
                                    <div>
                                        <Card key={i} blog={b} />
                                        <hr/>
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

Tag.getInitialProps = ({query}) => {
    return singleTag(query.slug).then(data => {
        if (data.error){
            console.log(data.error);
        }else{
            return {tag : data.tags, blogs:data.blogs };
        }
    })
}

export default withRouter(Tag);

