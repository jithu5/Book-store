import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { getBaseUrl } from "../../../utils/getBaseUrl"

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/users`,
        credentials: "include",
    }),
    tagTypes:["Users","Cart"],
    endpoints: (builder) => ({
        registerUserinDB: builder.mutation({
            query:(newUser)=>({
                url:"register",
                method:"POST",
                body:JSON.stringify(newUser),
                headers:{
                    "Content-Type":"application/json"
                }
            }),
            transformResponse:(response,meta,arg) => {
                return response.data;
            },
            invalidatesTags: ["Users"]
        }),
        loginUserDb: builder.mutation({
            query:(user)=>({
                url:"login",
                method:"POST",
                body:JSON.stringify(user),
                headers:{
                    "Content-Type":"application/json"
                },
                transformResponse:(response,meta,arg) => {
                    return response.data;
                },
                invalidatesTags: ["Users"]
            })
        }),
        logoutUserDb: builder.mutation({
            query:()=>({
                url:"logout",
                method:"POST",
                credentials:"include"
            }),
            invalidatesTags: ["Users"]
        }),
        getCartBooksDb: builder.query({
            query:()=>({
                url:"/cart",
                credentials:"include"
            }),
            // providesTags:["Cart","Users"]
        })
    })
})

export const { useRegisterUserinDBMutation, useLoginUserDbMutation,useGetCartBooksDbQuery,useLogoutUserDbMutation } = userApi

export default userApi;