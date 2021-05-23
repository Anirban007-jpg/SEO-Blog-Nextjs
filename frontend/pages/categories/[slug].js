import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { API, API_NAME, DOMAIN } from '../../config';
import router, { withRouter } from 'next/router';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { singleCategory } from '../../actions/category';
import Card from "../../components/blog/Card"

const Category = ({category, blogs}) => {

    const head = () => (
        <Head>
            <title>{category.name} | {API_NAME}</title>
            <meta name="description" content={category.name} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${router.pathname}`} />
            <meta property="og:title" content={`${category.name} | ${API_NAME}`} />
            <meta name="og:description" content="nfjnsjnvdjsnjbdkawbjkjadbwk" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${router.pathname}`} />
            <meta property="og:site_name" content={`${API_NAME}`} />
            <meta property="og:image:secure_url" content={`${API}/categories/${category.slug}`} />
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
                                <h1 className="display-4 font-weight-bold">{category.name}</h1>
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

Category.getInitialProps = ({query}) => {
    return singleCategory(query.slug).then(data => {
        if (data.error){
            console.log(data.error);
        }else{
            return {category : data.category, blogs:data.blogs };
        }
    })
}

export default withRouter(Category);

