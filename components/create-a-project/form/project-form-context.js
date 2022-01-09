import { createContext, useContext, useState } from "react";

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    bio: "",
    profileImgUrl: "",
    setFirstName: () => {},
    setLastName: () => {},
    setBio: () => {},
    setProfileImgUrl: () => {},
    error: "",
    setError: () => {},
    step: 1,
    setStep: () => {}
};

export const ProjectFormContext = createContext(INITIAL_STATE);

export function ProjectFormProvider({ children }) {
    const [firstName, setFirstName] = useState(INITIAL_STATE.firstName);
    const [lastName, setLastName] = useState(INITIAL_STATE.lastName);
    const [bio, setBio] = useState(INITIAL_STATE.bio);
    const [profileImgUrl, setProfileImgUrl] = useState(INITIAL_STATE.profileImgUrl);
    const [error, setError] = useState(INITIAL_STATE.error);
    const [step, setStep] = useState(INITIAL_STATE.step);

    const value = { firstName, lastName, bio, profileImgUrl, error, setFirstName, step, setStep, setError };

    return (
        <ProjectFormContext.Provider value={value}>
            {children}
        </ProjectFormContext.Provider>
    )
}

export function useProjectForm() {
    const context = useContext(ProjectFormContext);
    return context;
}