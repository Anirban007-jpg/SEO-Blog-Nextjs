import fetch from 'isomorphic-fetch';
import { API } from '../config';
import querystring from 'query-string';
import { handleResponse } from './auth';

export const createBlog = (blog, token) => {
    return fetch(`${API}/blog/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body : blog
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createUserBlog = (blog, token) => {
    return fetch(`${API}/blog/user/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body : blog
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createCustomerBlog = (blog, token) => {
    return fetch(`${API}/blog/customer/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body : blog
    })
        .then(response => {
            return response.json();
        })
}

export const listBlogsWithCategoriesAndTags = (skip,limit) => {
    const data = {
        limit,skip
    }
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleBlog = slug => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'        
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const listRelated = (blog) => {
    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${API}/blogs`, {
        method: 'GET'        
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const removeBlog = (slug, token) => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateBlogbyUser = (blog, slug, token) => {
    return fetch(`${API}/blog/user/${slug}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body : blog
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = (params) => {
    console.log('search params', params);
    let query = querystring.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/blog/search?${query}`, {
        method: 'GET'        
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}