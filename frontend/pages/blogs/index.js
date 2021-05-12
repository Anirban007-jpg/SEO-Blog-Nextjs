import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog'
import { API } from '../../config';


const Blogs = () => {
    return (
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">List of Tags and Categories</h1>
                                <section>
                                    <p>show categories and tags</p>
                                </section>
                            </div>
                        </header>
                    </div>
                    <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">Show all Blogs</div>
                            </div>
                    </div>
                </main>
            </Layout>
    )
}

export default Blogs