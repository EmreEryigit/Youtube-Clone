import axios from "axios";

export function registerUser(payload: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
}) {
    return axios.post("/api/users", payload).then((res) => res.data);
}

export function login(payload: { email: string; password: string }) {
    return axios
        .post("/api/auth", payload, {
            withCredentials: true,
        })
        .then((res) => res.data);
}

export function getMe() {
    return axios
        .get("/api/users", {
            withCredentials: true,
        })
        .then((res) => res.data)
        .catch(() => null);
}

export function uploadVideo({
    formData,
    config,
}: {
    formData: FormData;
    config: { onUploadProgress: (progressEvent: any) => void };
}) {
    return axios
        .post("/api/videos", formData, {
            withCredentials: true,
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
}

export function updateVideo({
    videoId,
    ...payload
}: {
    videoId: string;
    title: string;
    description: string;
    published: boolean;
}) {
    return axios.patch("/api/videos", payload, {
        withCredentials: true,
    });
}

export function getVideos() {
    return axios.get("/api/videos").then((res) => res.data)
}