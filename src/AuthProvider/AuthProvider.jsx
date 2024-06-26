import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";
// import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";



// create auth export authContext, and get google provider
const auth = getAuth(app);
export const AuthContext = createContext('');
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    // hooks
    const [currentUser, setCurrentUser] = useState('')
    const [authLoading, setAuthLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    // email-password sign up function
    const createNewUser = (email, password) => {
        setAuthLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    // Email-password sign up profile info update
    const updateUserProfile = (currentUsersInfo, username, photo) => {
        updateProfile(currentUsersInfo, {
            displayName: username, photoURL: photo
        })
            .then(() => {
                //
            })
            .catch(() => {
                //
            })
    }


    // email-password sign in function
    const signInUser = (email, password) => {
        setAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //Google sign up function
    const createNewUserByGoogle = () => {
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    //Sign out
    const signOutUser = () => {
        setAuthLoading(true);
        return signOut(auth);
    }


    //keep trace on logged in user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setAuthLoading(false);
            // if user is available, send the user email to backend
            if (user) {
                const userInfo = { email: user?.email }
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        const token = res.data?.token
                        if (token) {
                            localStorage.setItem('access-token', token);
                            setAuthLoading(false)
                        }
                    })
            }
            // if user is not available remove the access token
            else {
                localStorage.removeItem('access-token')
                setAuthLoading(false)
            }
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])




    // send the info to context
    const authInfo = { createNewUser, updateUserProfile, signOutUser, createNewUserByGoogle, signInUser, currentUser, authLoading };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;