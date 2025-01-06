import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { getBaseUrl } from "../../../utils/getBaseUrl"

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/users`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUserinDB: builder.mutation({
            query:(newUser)=>({
                url:"register",
                method:"POST",
                body:JSON.stringify(newUser),
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }),
        loginUser: builder.mutation({
            query:(user)=>({
                url:"login",
                method:"POST",
                body:JSON.stringify(user),
                headers:{
                    "Content-Type":"application/json"
                }
            })
        })
    })
})

export const { useRegisterUserinDBMutation, useLoginUserMutation } = userApi

export default userApi;