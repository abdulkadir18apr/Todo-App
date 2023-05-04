export const loginUser=async(credentials)=>{
    const res=await fetch("https://todo-backend-lemon.vercel.app/api/auth/login",{

    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(credentials)

    })
    const json=await res.json();
    return json;
}

export const signupUser=async(credentials)=>{
    const res=await fetch("https://todo-backend-lemon.vercel.app/api/auth/signup",{

    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(credentials)

    })
    const json=await res.json();
    return json;
}

export const  fetchTodo=async()=>{
    const res=await fetch("https://todo-backend-lemon.vercel.app/api/todo/fetchTodo",{

    method:"GET",
    headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('auth-token')
    },

    })
    const json=await res.json();
    return json;
    
}

export const  addTodo=async(todo)=>{
    const res=await fetch("https://todo-backend-lemon.vercel.app/api/todo/addTodo",{

    method:"PUT",
    headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('auth-token')
    },
    body:JSON.stringify(todo)
    })
    const json=await res.json();
    return json;
    
}