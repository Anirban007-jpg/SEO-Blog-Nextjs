import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? '' : 'http://localhost:8000/api';
export const API_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = publicRuntimeConfig.PRODUCTION ? '' : publicRuntimeConfig.DOMAIN_DEVELOPMENT;
export const DISQUS_SHORTNAME = 'seoblog-ucno9dvq83';