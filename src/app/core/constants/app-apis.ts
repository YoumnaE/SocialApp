import { User } from './../../features/feed/interfaces/iAllPostsResponse';
import { environment } from "../../../environments/environment.development";

export const App_Apis ={
    auth:{
        register:`${environment.baseUrl}/users/signup`,
        login:`${environment.baseUrl}/users/signin`
    },
    posts:{
        add:`${environment.baseUrl}/posts`,
        get:`${environment.baseUrl}/posts`,
        delete:`${environment.baseUrl}/posts`
    },
    comments:{
        add:`${environment.baseUrl}/posts`,
        get: (postId: string) =>`${environment.baseUrl}/posts/${postId}/comments`,
        delete:`${environment.baseUrl}/posts`
    },
    suggestions:{
        get:`${environment.baseUrl}/users/suggestions?limit=10`,
        toggleFollowers: `${environment.baseUrl}/users`
    },
    user:{
        get:`${environment.baseUrl}/users`
    }
}