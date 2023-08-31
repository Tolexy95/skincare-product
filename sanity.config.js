import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import{visionTool} from "@sanity/vision"
import { product } from './sanity/schema/product-schema'
import banner from './sanity/schema/banner'


const config =defineConfig({
  projectId: '1dgz2vj4',
  
  dataset: 'production',
  
  title: 'My skincare e-commerce project',
  
  apiVersion:"2023-08-21",
 
  basePath:"/studio",
  
  plugins: [deskTool(), visionTool()],

  schema:{types: [product, banner]}

})



export default config