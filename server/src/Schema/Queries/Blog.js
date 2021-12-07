import { GraphQLList } from 'graphql';
import Blog from '../../Models/blog.js'
import { BlogType } from '../TypeDefs/Blog.js';
import User from "../../Models/user.js"

export const GET_ALL_BLOGS = {
  type: new GraphQLList(BlogType),
  async resolve() {
    const blogs = await Blog.find();
    let blogsDetail = blogs?.map(async (blog) => {
      let user = await User.findOne({ id: blog?.creator });
      if (user) {
        return { ...blog, creator: user.name };
      }
      return { ...blog };
    });
    console.log(blogsDetail);
    return blogsDetail;
  },
};
