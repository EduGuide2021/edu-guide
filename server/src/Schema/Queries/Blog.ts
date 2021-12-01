import { GraphQLList } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Blog } from "../../Entities/Blog";
import { BlogType } from "../TypeDefs/Blog";
import { Users } from "../../Entities/Users";

export const GET_ALL_BLOGS = {
  type: new GraphQLList(BlogType),
  async resolve(){
    const blogs=await Blog.find();
    let blogsDetail=blogs?.map(async(blog)=>{
      let user=await Users.findOne({id:blog?.creator})
      if(user){
        return {...blog,creator:user.name}
      }
      return {...blog}
    })
    console.log(blogsDetail)
    return blogsDetail
  },
};
